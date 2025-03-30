export type Error = {
  data: {
    error: string;
    error_description: string;
  };
  status: number;
};

export type LoginRequest = {
	username: string;
	password: string;
}
  
export type LoginResponse = {
	access_token: string;
	error?: Error;
}

export type UserResponse = {
  userId: string
  userName: string
  firstName: string
  lastName: string
  mobileNumber: string
  isUSCitizen: boolean
  status: string
  lastLoginAt: string
  contacts: any[]
  addresses: any[]
  listCustomFields: ListCustomField[]
  employmentDetails: any[]
  taxDetails: any[]
  memberships: Membership[]
  kycDetails: KycDetails
  apps: App[]
  listRoles: string[]
  permissions: any[]
  segments: any[]
  creditDetails: any[]
  createdAt: string
  passwordExpired: boolean
  updatedAt: string
  cif: string
  devices: any[]
}

export type ListCustomField ={
  customFieldId: string
  customKey: string
  customValue: string
}

export type Membership = {
  membershipId: string
  organisationId: string
  organisationName: string
  roleName: string
  token: string
  organisationNumber: string
  companyNumber: string
}

export type KycDetails = {
  documents: any[]
}

export type App  ={
  appName: string
  onboardingAt?: string
}

export interface InvoiceResponse {
  createdAt: string
  createdBy: string
  currency: string
  currencySymbol: string
  description: string
  dueDate: string
  extensions: any[]
  invoiceDate: string
  invoiceId: string
  invoiceNumber: string
  invoiceSubTotal: number
  totalDiscount: number
  totalTax: number
  totalAmount: number
  totalPaid: number
  balanceAmount: number
  numberOfDocuments: number
  documents: any[]
  items: any[]
  merchant: Merchant
  payments: any[]
  sentAt?: string
  status: Status[]
  subStatus: SubStatu[]
  type: string
  version: string
  invoiceGrossTotal: number
  customFields: CustomField[]
  customer?: Customer
  referenceNo?: string
  invoiceReference?: string
}

export interface Merchant {
  id: string
  name?: string
  addresses: any[]
}

export interface Status {
  key: string
  value: boolean
}

export interface SubStatu {
  key: string
  value: boolean
}

export interface CustomField {
  key: string
  value: string
}

export type InvoiceRequest = {
  keyword?: string,
  status?: string,
  ordering?: string,
  sortBy?: string,
  pageSize: number,
  pageNum: number
}

export interface CreateInvoiceRequest {
  invoices: NewInvoice[]
}

export interface NewInvoice {
  bankAccount: BankAccount
  customer: Customer
  documents: Document[]
  invoiceReference: string
  invoiceNumber: string
  currency: string
  invoiceDate: string
  dueDate: string
  description: string
  customFields: CustomField[]
  extensions: Extension[]
  items: Item[]
}

export interface BankAccount {
  bankId: string
  sortCode: string
  accountNumber: string
  accountName: string
}

export interface Customer {
  firstName: string
  lastName: string
  contact: Contact
  addresses: Address[]
}

export interface Contact {
  email: string
  mobileNumber: string
}

export interface Address {
  premise: string
  countryCode: string
  postcode: string
  county: string
  city: string
  addressType: string
}

export interface Document {
  documentId: string
  documentName: string
  documentUrl: string
}

export interface CustomField {
  key: string
  value: string
}

export interface Extension {
  addDeduct: string
  value: number
  type: string
  name: string
}

export interface Item {
  itemReference: string
  description: string
  quantity: number
  rate: number
  itemName: string
  itemUOM: string
  customFields: CustomField[]
  extensions: Extension[]
}


  