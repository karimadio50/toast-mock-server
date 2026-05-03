export enum OrderableOnline {
  YES = "YES",
  NO = "NO"
}

export enum Visibility {
  ALL = "ALL",
  POS_ONLY = "POS_ONLY",
  NONE = "NONE"
}

export interface ToastPosDataMeta {
  schemaVersion: string;
  generatedAt: string;
}

export interface ToastAccount {
  guid: string;
  externalId: string;
  name: string;
  restaurantExternalIds: string[];
}

export interface ToastRestaurantLocation {
  address1: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface ToastRestaurant {
  restaurantGuid: string;
  managementGroupGuid: string;
  deleted: boolean;
  restaurantName: string;
  locationName: string;
  createdByEmailAddress: string;
  externalGroupRef: string;
  externalRestaurantRef: string;
  modifiedDate: number;
  createdDate: number;
  isoModifiedDate: string;
  isoCreatedDate: string;
  guid: string;
  externalId: string;
  name: string;
  timezone: string;
  currency: string;
  location: ToastRestaurantLocation;
  phone: string;
}

export interface ToastServiceArea {
  guid: string;
  entityType: string;
  externalId: string;
  name: string;
  tableService: boolean;
  revenueCenter: ToastRevenueCenter;
}

export interface ToastRevenueCenter {
  guid: string;
  entityType: string;
  externalId?: string;
  name?: string;
  description?: string;
}

export interface ToastTable {
  guid: string;
  entityType: string;
  externalId: string;
  name: string;
  serviceArea: ToastEntityReference;
  revenueCenter: ToastEntityReference;
  capacity: number;
  status: string;
}

export interface ToastModifier {
  guid: string;
  entityType: string;
  externalId: string;
  name: string;
  price: number;
}

export interface ToastEntityReference {
  guid: string;
  entityType: string;
  externalId: string;
}

export interface ToastImage {
  url: string;
}

export interface ToastModifierGroup {
  guid: string;
  entityType: string;
  externalId: string;
  name: string;
  minSelections: number;
  maxSelections: number;
  options: ToastEntityReference[];
  modifiers: ToastModifier[];
}

export interface ToastMenuGroup {
  guid: string;
  entityType: string;
  externalId: string;
  name: string;
  menuGuid: string;
  menu: ToastEntityReference;
  orderableOnline: OrderableOnline;
  visibility: Visibility;
  parent: ToastEntityReference;
  items: ToastEntityReference[];
  subgroups: ToastEntityReference[];
  optionGroups: ToastEntityReference[];
  inheritOptionGroups: boolean;
  images: ToastImage[];
  unitOfMeasure: string;
  inheritUnitOfMeasure: boolean;
}

export interface ToastMenuItem {
  guid: string;
  entityType: string;
  externalId: string;
  name: string;
  calories: number;
  sku: string;
  plu: string;
  orderableOnline: OrderableOnline;
  visibility: Visibility;
  type: string;
  optionGroups: ToastEntityReference[];
  inheritOptionGroups: boolean;
  images: ToastImage[];
  unitOfMeasure: string;
  inheritUnitOfMeasure: boolean;
  menuGroupGuid: string;
  price: number;
  modifierGroupGuids: string[];
}

export interface ToastMenu {
  guid: string;
  entityType: string;
  externalId: string;
  name: string;
  orderableOnline: OrderableOnline;
  visibility: Visibility;
  groups: ToastEntityReference[];
  images: ToastImage[];
  unitOfMeasure: string;
  menuGroupGuids: string[];
}

export interface ToastOrder {
  guid: string;
  entityType?: string;
  externalId?: string;
  openedDate?: string;
  modifiedDate?: string;
  promisedDate?: string;
  channelGuid?: string;
  diningOption?: ToastEntityReference;
  checks: ToastCheck[];
  table?: ToastEntityReference;
  serviceArea?: ToastEntityReference;
  restaurantService?: ToastEntityReference;
  revenueCenter?: ToastEntityReference;
  source?: string;
  duration?: number;
  numberOfGuests?: number;
  voided?: boolean;
  voidDate?: string;
  voidBusinessDate?: number;
  paidDate?: string;
  closedDate?: string;
  deletedDate?: string;
  deleted?: boolean;
  businessDate?: number;
  server?: ToastEntityReference;
  pricingFeatures?: string[];
  approvalStatus?: string;
  createdDevice?: { id: string };
  createdDate?: string;
  lastModifiedDevice?: { id: string };
  createdInTestMode?: boolean;
  excessFood?: boolean;
  displayNumber?: string;
}

export interface ToastCheck {
  guid: string;
  entityType?: string;
  externalId?: string;
  createdDate?: string;
  openedDate?: string;
  closedDate?: string;
  modifiedDate?: string;
  deletedDate?: string;
  deleted?: boolean;
  selections: ToastSelection[];
  customer?: ToastCustomer;
  taxExempt?: boolean;
  displayNumber?: string;
  appliedServiceCharges?: ToastAppliedServiceCharge[];
  amount?: number;
  taxAmount?: number;
  totalAmount?: number;
  payments?: ToastPayment[];
  tabName?: string;
  paymentStatus?: string;
}

export interface ToastSelection {
  guid: string;
  entityType?: string;
  externalId?: string;
  item: ToastEntityReference;
  quantity: number;
  price: number;
  tax: number;
  displayName?: string;
  voided?: boolean;
  voidDate?: string;
}

export interface ToastCustomer {
  guid?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
}

export interface ToastAppliedServiceCharge {
  guid: string;
  entityType?: string;
  chargeAmount: number;
  serviceCharge: ToastEntityReference;
  name: string;
}

export interface ToastPayment {
  guid: string;
  entityType?: string;
  type: string;
  amount: number;
  tipAmount?: number;
  voidInfo?: {
    voidUser?: ToastEntityReference;
    voidApprover?: ToastEntityReference;
    voidDate?: string;
    voidBusinessDate?: number;
    voidReason?: ToastEntityReference;
  };
}

export interface ToastBooking {
  guid: string;
  externalId: string;
  guestName: string;
  partySize: number;
  tableGuid: string;
  status: string;
  startAt: string;
  endAt: string;
}

export interface ToastRestaurantData {
  restaurant: ToastRestaurant;
  serviceAreas: ToastServiceArea[];
  tables: ToastTable[];
  modifierGroups: ToastModifierGroup[];
  menuGroups: ToastMenuGroup[];
  menuItems: ToastMenuItem[];
  menus: ToastMenu[];
  orders: ToastOrder[];
  bookings: ToastBooking[];
  preModifierGroups: ToastPreModifierGroup[];
  preModifiers: ToastPreModifier[];
  jobs: ToastJob[];
  employees: ToastEmployee[];
  shifts: ToastShift[];
  diningOptions: ToastDiningOption[];
  revenueCenters: ToastRevenueCenter[];
  restaurantServices: ToastRestaurantService[];
  configMenus: any[]; // Using any[] or a specific type if needed for config menus
  menusV3?: any;
  menusV2?: any;
}

export interface ToastDiningOption {
  guid: string;
  entityType: string;
  externalId: string | null;
  name: string;
  behavior: string | null;
  curbside: boolean;
}

export interface ToastRestaurantService {
  guid: string;
  entityType: string;
  name: string;
}

export interface ToastWageOverride {
  wage: number;
  jobReference: ToastEntityReference;
}

export interface ToastEmployee {
  guid: string;
  entityType: string;
  externalId?: string;
  createdDate: string;
  modifiedDate: string;
  deletedDate?: string;
  firstName: string;
  chosenName?: string;
  lastName: string;
  email?: string;
  phoneNumber?: string;
  phoneNumberCountryCode?: string;
  passcode?: string;
  externalEmployeeId?: string;
  deleted: boolean;
  jobReferences: ToastEntityReference[];
  wageOverrides: ToastWageOverride[];
  v2EmployeeGuid?: string;
}

export interface ToastJob {
  guid: string;
  entityType: string;
  externalId?: string;
  createdDate: string;
  modifiedDate: string;
  deletedDate?: string;
  title: string;
  deleted: boolean;
  wageFrequency: string;
  defaultWage: number;
  tipped: boolean;
  code?: string;
  excludeFromReporting: boolean;
}

export interface ToastScheduleConfig {
  guid: string;
  minBeforeClockIn?: number;
  minAfterClockIn?: number;
  minBeforeClockOut?: number;
  minAfterClockOut?: number;
}

export interface ToastShift {
  guid: string;
  entityType?: string;
  externalId?: string;
  createdDate?: string;
  modifiedDate?: string;
  deletedDate?: string;
  deleted?: boolean;
  jobReference: ToastEntityReference;
  employeeReference: ToastEntityReference;
  inDate: string;
  outDate: string;
  scheduleConfig?: ToastScheduleConfig;
}

export interface ToastPreModifierGroup {
  guid: string;
  entityType: string;
  name: string;
  isDefault: boolean;
}

export enum ToastPreModifierDisplayMode {
  PREFIX = 'PREFIX',
  SUFFIX = 'SUFFIX',
}

export interface ToastPreModifier {
  guid: string;
  entityType: string;
  name: string;
  scalePrice: boolean;
  basePrice: number;
  scaleFactor: number;
  displayMode: ToastPreModifierDisplayMode;
  parent: {
    guid: string;
    entityType: string;
  };
  chargeAsExtra: boolean;
}

export type ToastRestaurantCollectionKey =
  | 'serviceAreas'
  | 'tables'
  | 'modifierGroups'
  | 'menuGroups'
  | 'menuItems'
  | 'menus'
  | 'orders'
  | 'bookings'
  | 'preModifiers'
  | 'preModifierGroups'
  | 'jobs'
  | 'employees'
  | 'shifts'
  | 'diningOptions'
  | 'revenueCenters'
  | 'restaurantServices'
  | 'configMenus'
  | 'menusV3'
  | 'menusV2';

export interface ToastPosDataStore {
  meta: ToastPosDataMeta;
  account: ToastAccount;
  byRestaurantExternalId: Record<string, ToastRestaurantData>;
}

