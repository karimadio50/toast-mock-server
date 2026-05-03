const fs = require('fs');
const path = require('path');

const basePath = 'c:\\Users\\Adio Karim\\OneDrive\\Documents\\Github\\toast-mock-server\\src\\api';

const modules = [
  {
    name: 'dining-options',
    pascal: 'DiningOptions',
    camel: 'diningOptions',
    endpoint: 'config/v2/diningOptions',
    collectionKey: 'diningOptions'
  },
  {
    name: 'revenue-centers',
    pascal: 'RevenueCenters',
    camel: 'revenueCenters',
    endpoint: 'config/v2/revenueCenters',
    collectionKey: 'revenueCenters'
  },
  {
    name: 'restaurant-services',
    pascal: 'RestaurantServices',
    camel: 'restaurantServices',
    endpoint: 'config/v2/restaurantServices',
    collectionKey: 'restaurantServices'
  }
];

modules.forEach(mod => {
  const dir = path.join(basePath, mod.name, `get-${mod.name}`);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const controllerContent = `import { Controller, Get, Headers, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiOkResponse, ApiOperation, ApiSecurity } from '@nestjs/swagger';
import { Get${mod.pascal}Service } from './get-${mod.name}.service';

@ApiBearerAuth('BearerAuth')
@ApiSecurity('ToastRestaurantExternalId')
@ApiHeader({
  name: 'Toast-Restaurant-External-ID',
  required: true,
  description: 'Restaurant external ID',
  schema: { type: 'string' },
})
@Controller('${mod.endpoint}')
export class Get${mod.pascal}Controller {
  constructor(private readonly get${mod.pascal}Service: Get${mod.pascal}Service) {}

  @Get()
  @ApiOperation({ summary: 'Get ${mod.name.replace('-', ' ')}' })
  async get${mod.pascal}(
    @Headers('toast-restaurant-external-id') restaurantExternalIdHeader: string | string[] | undefined,
  ): Promise<any[]> {
    return this.get${mod.pascal}Service.execute(restaurantExternalIdHeader);
  }
}
`;

  const serviceContent = `import { Injectable } from '@nestjs/common';
import { ToastPosDataService } from '@core/services/toast-pos-data.service';

@Injectable()
export class Get${mod.pascal}Service {
  constructor(private readonly toastPosDataService: ToastPosDataService) {}

  execute(restaurantExternalIdHeader: string | string[] | undefined): any[] {
    const restaurantExternalId = this.toastPosDataService.getRestaurantExternalIdFromHeader(restaurantExternalIdHeader);
    return this.toastPosDataService.getCollectionByRestaurantExternalId(restaurantExternalId, '${mod.collectionKey}');
  }
}
`;

  fs.writeFileSync(path.join(dir, `get-${mod.name}.controller.ts`), controllerContent);
  fs.writeFileSync(path.join(dir, `get-${mod.name}.service.ts`), serviceContent);
});

// Config Menus
const configDir = path.join(basePath, 'config', 'get-menus');
if (!fs.existsSync(configDir)) fs.mkdirSync(configDir, { recursive: true });
const configController = `import { Controller, Get, Headers } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiSecurity } from '@nestjs/swagger';
import { GetConfigMenusService } from './get-menus.service';

@ApiBearerAuth('BearerAuth')
@ApiSecurity('ToastRestaurantExternalId')
@ApiHeader({ name: 'Toast-Restaurant-External-ID', required: true })
@Controller('config/v2/menus')
export class GetConfigMenusController {
  constructor(private readonly service: GetConfigMenusService) {}

  @Get()
  @ApiOperation({ summary: 'Get config v2 menus' })
  async getMenus(@Headers('toast-restaurant-external-id') restaurantExternalIdHeader: string | string[] | undefined): Promise<any[]> {
    return this.service.execute(restaurantExternalIdHeader);
  }
}
`;
const configService = `import { Injectable } from '@nestjs/common';
import { ToastPosDataService } from '@core/services/toast-pos-data.service';

@Injectable()
export class GetConfigMenusService {
  constructor(private readonly toastPosDataService: ToastPosDataService) {}

  execute(restaurantExternalIdHeader: string | string[] | undefined): any[] {
    const restaurantExternalId = this.toastPosDataService.getRestaurantExternalIdFromHeader(restaurantExternalIdHeader);
    return this.toastPosDataService.getCollectionByRestaurantExternalId(restaurantExternalId, 'configMenus');
  }
}
`;
fs.writeFileSync(path.join(configDir, 'get-menus.controller.ts'), configController);
fs.writeFileSync(path.join(configDir, 'get-menus.service.ts'), configService);

// Authentication
const authDir = path.join(basePath, 'authentication', 'get-token');
if (!fs.existsSync(authDir)) fs.mkdirSync(authDir, { recursive: true });
const authController = `import { Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { GetTokenService } from './get-token.service';

@Controller('authentication/v1/authentication/login')
export class GetTokenController {
  constructor(private readonly service: GetTokenService) {}

  @Post()
  @ApiOperation({ summary: 'Get access token' })
  async getToken(): Promise<any> {
    return this.service.execute();
  }
}
`;
const authService = `import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class GetTokenService {
  execute(): any {
    const accessPath = path.resolve(process.cwd(), 'src/api/mock-data/ToastMockData/access.json');
    if (fs.existsSync(accessPath)) {
      return JSON.parse(fs.readFileSync(accessPath, 'utf8'));
    }
    return { token: { accessToken: "MOCK_TOKEN" } };
  }
}
`;
fs.writeFileSync(path.join(authDir, 'get-token.controller.ts'), authController);
fs.writeFileSync(path.join(authDir, 'get-token.service.ts'), authService);

console.log('Files generated successfully.');
