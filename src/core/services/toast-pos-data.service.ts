import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import * as fs from 'node:fs';
import * as path from 'node:path';
import {
  ToastAccount,
  ToastMenuItem,
  ToastPosDataStore,
  ToastRestaurant,
  ToastRestaurantCollectionKey,
  ToastRestaurantData,
  ToastTable,
  ToastOrder,
  ToastMenu,
  ToastMenuGroup,
  ToastModifierGroup,
  ToastServiceArea,
  ToastPreModifierGroup,
  ToastPreModifier,
  ToastEmployee,
  ToastJob,
  ToastShift,
  ToastDiningOption,
  ToastRevenueCenter,
  ToastRestaurantService,
} from '@core/models/toast-pos-data.model';

@Injectable()
export class ToastPosDataService {
  private readonly dataPath: string;
  private readonly store: ToastPosDataStore;

  constructor() {
    this.dataPath = this.resolveDataFilePath();
    this.store = this.loadDataStoreFromFile();
  }

  getStore(): ToastPosDataStore {
    return this.store;
  }

  getAccount(): ToastAccount {
    return this.store.account;
  }

  listRestaurants(): ToastRestaurant[] {
    return this.store.account.restaurantExternalIds.map((externalId) => {
      const restaurantData = this.getRestaurantDataByExternalId(externalId);
      return restaurantData.restaurant;
    });
  }

  getRestaurantDataByExternalId(
    restaurantExternalId: string,
  ): ToastRestaurantData {
    const normalizedExternalId = restaurantExternalId.trim();
    const restaurantData =
      this.store.byRestaurantExternalId[normalizedExternalId];

    if (!restaurantData) {
      throw new NotFoundException(
        `Restaurant not found for external ID: ${normalizedExternalId}`,
      );
    }

    return restaurantData;
  }

  getRestaurantDataByGuid(restaurantGuid: string): ToastRestaurantData {
    const restaurantData = Object.values(this.store.byRestaurantExternalId).find(
      (data) => data.restaurant.restaurantGuid === restaurantGuid,
    );

    if (!restaurantData) {
      throw new NotFoundException(
        `Restaurant not found for GUID: ${restaurantGuid}`,
      );
    }

    return restaurantData;
  }

  getCollectionByRestaurantExternalId<K extends ToastRestaurantCollectionKey>(
    restaurantExternalId: string,
    key: K,
  ): ToastRestaurantData[K] {
    const restaurantData =
      this.getRestaurantDataByExternalId(restaurantExternalId);
    return restaurantData[key];
  }

  findTablesByServiceAreaExternalId(
    restaurantExternalId: string,
    serviceAreaExternalId?: string,
  ): ToastTable[] {
    const restaurantData =
      this.getRestaurantDataByExternalId(restaurantExternalId);

    if (!serviceAreaExternalId) {
      return restaurantData.tables;
    }

    const serviceArea = restaurantData.serviceAreas.find(
      ({ externalId }) => externalId === serviceAreaExternalId,
    );

    if (!serviceArea) {
      return [];
    }

    return restaurantData.tables.filter(
      ({ serviceArea }) => serviceArea.guid === serviceArea.guid,
    );
  }

  findMenuItemsByMenuGroupGuid(
    restaurantExternalId: string,
    menuGroupGuid?: string,
  ): ToastMenuItem[] {
    const restaurantData =
      this.getRestaurantDataByExternalId(restaurantExternalId);

    if (!menuGroupGuid) {
      return restaurantData.menuItems;
    }

    return restaurantData.menuItems.filter(
      (menuItem) => menuItem.menuGroupGuid === menuGroupGuid,
    );
  }

  getOrders(): ToastOrder[] {
    const ordersPath = this.resolveOrdersFilePath();
    if (!fs.existsSync(ordersPath)) {
      return [];
    }

    try {
      const raw = fs.readFileSync(ordersPath, 'utf8');
      return JSON.parse(raw) as ToastOrder[];
    } catch (error) {
      console.error(`Failed to load orders from ${ordersPath}:`, error);
      return [];
    }
  }

  saveOrder(order: ToastOrder): void {
    const ordersPath = this.resolveOrdersFilePath();
    let orders: ToastOrder[] = [];

    if (fs.existsSync(ordersPath)) {
      try {
        const raw = fs.readFileSync(ordersPath, 'utf8');
        orders = JSON.parse(raw) as ToastOrder[];
      } catch (error) {
        console.error(
          `Failed to parse orders file at ${ordersPath}, starting fresh:`,
          error,
        );
      }
    }

    orders.push(order);

    try {
      fs.writeFileSync(ordersPath, JSON.stringify(orders, null, 2), 'utf8');
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to save order to ${ordersPath}: ${error}`,
      );
    }
  }

  voidOrder(
    orderGuid: string,
    selectionsVoidAll: boolean,
    paymentsVoidAll: boolean,
  ): ToastOrder {
    const ordersPath = this.resolveOrdersFilePath();
    let orders: ToastOrder[] = [];

    if (fs.existsSync(ordersPath)) {
      try {
        const raw = fs.readFileSync(ordersPath, 'utf8');
        orders = JSON.parse(raw) as ToastOrder[];
      } catch (error) {
        throw new InternalServerErrorException(
          `Failed to parse orders file at ${ordersPath}`,
        );
      }
    }

    const orderIndex = orders.findIndex((o) => o.guid === orderGuid);
    if (orderIndex === -1) {
      throw new NotFoundException(`Order with GUID ${orderGuid} not found`);
    }

    const order = orders[orderIndex];
    const now = new Date().toISOString();

    order.voided = true;
    order.voidDate = now;
    order.modifiedDate = now;

    if (selectionsVoidAll) {
      order.checks.forEach((check) => {
        check.selections.forEach((selection) => {
          selection.voided = true;
          selection.voidDate = now;
        });
      });
    }

    if (paymentsVoidAll) {
      order.checks.forEach((check) => {
        if (check.payments) {
          check.payments.forEach((payment) => {
            payment.voidInfo = {
              voidDate: now,
              voidBusinessDate: order.businessDate || 0,
            };
          });
        }
      });
    }

    try {
      fs.writeFileSync(ordersPath, JSON.stringify(orders, null, 2), 'utf8');
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to update order in ${ordersPath}: ${error}`,
      );
    }

    return order;
  }

  getFullMenusV3(restaurantExternalId?: string): any {
    if (restaurantExternalId) {
      const restaurantData = this.store.byRestaurantExternalId[restaurantExternalId];
      if (restaurantData?.menusV3) {
        return restaurantData.menusV3;
      }
    }

    const allData = Object.values(this.store.byRestaurantExternalId);
    const fallback = allData.find(d => d.menusV3);
    if (fallback) {
      return fallback.menusV3;
    }

    const allMenus = allData.flatMap(
      (data) => data.menus || []
    );
    return { menus: allMenus };
  }

  getFullConfigMenus(restaurantExternalId?: string): any {
    if (restaurantExternalId) {
      const restaurantData = this.store.byRestaurantExternalId[restaurantExternalId];
      if (restaurantData?.configMenus) {
        return { menus: restaurantData.configMenus };
      }
    }

    const allData = Object.values(this.store.byRestaurantExternalId);
    const fallback = allData.find(d => d.configMenus);
    if (fallback) {
      return { menus: fallback.configMenus };
    }

    const allConfigMenus = allData.flatMap(
      (data) => data.configMenus || []
    );
    return { menus: allConfigMenus };
  }


  getFullMenusV2(restaurantExternalId?: string): any {
    if (restaurantExternalId) {
      const restaurantData = this.store.byRestaurantExternalId[restaurantExternalId];
      if (restaurantData?.menusV2) {
        return restaurantData.menusV2;
      }
    }

    const allData = Object.values(this.store.byRestaurantExternalId);
    const fallback = allData.find(d => d.menusV2);
    if (fallback) {
      return fallback.menusV2;
    }

    const allMenus = allData.flatMap(
      (data) => data.menus || []
    );
    return { menus: allMenus };
  }

  getConnectedRestaurants(): any {
    const allRestaurants = Object.values(this.store.byRestaurantExternalId).map(
      (data) => data.restaurant
    );
    return allRestaurants;
  }

  private loadDataStoreFromFile(): ToastPosDataStore {
    try {
      const raw = fs.readFileSync(this.dataPath, 'utf8');
      return JSON.parse(raw) as ToastPosDataStore;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to load toast mock data file: ${this.dataPath}. ${error.message}`,
      );
    }
  }

  private resolveDataFilePath(): string {
    const candidates = [
      path.resolve(process.cwd(), 'src/api/mock-data/toast-pos-data-v2.json'),
      path.resolve(process.cwd(), 'src/mock-data/toast-pos-data-v2.json'),
      path.resolve(process.cwd(), 'dist/api/mock-data/toast-pos-data-v2.json'),
      path.resolve(process.cwd(), 'dist/mock-data/toast-pos-data-v2.json'),
    ];

    const foundPath = candidates.find((candidate) => fs.existsSync(candidate));

    if (!foundPath) {
      throw new InternalServerErrorException(
        'toast-pos-data-v2.json not found in expected locations',
      );
    }

    return foundPath;
  }

  getRestaurantExternalIdFromHeader(
    headerValue: string | string[] | undefined,
  ): string {
    if (Array.isArray(headerValue)) {
      if (headerValue.length !== 1 || !headerValue[0]?.trim()) {
        throw new BadRequestException(
          'Toast-Restaurant-External-ID header must be a single non-empty string',
        );
      }

      return headerValue[0].trim();
    }

    if (!headerValue || !headerValue.trim()) {
      throw new BadRequestException(
        'Toast-Restaurant-External-ID header is required',
      );
    }

    return headerValue.trim();
  }

  private resolveOrdersFilePath(): string {
    return path.join(path.dirname(this.dataPath), 'toast-pos-orders.json');
  }
}

