export interface CartInterface {
  id: string;
  name: string;
  brand?: string;
  clock?: string;
  socket?: string;
  price: string;
  quantity?: number;
}

export interface GenericInterface {
  error?: boolean;
  loading?: boolean;
  part?: [];
  types?: [];
  cart?: any;
  cartQuantity?: number;
  cartVisible?: boolean;
  cartMessage?: string;
  notificationVisible?: boolean;
  notificationMessage?: {
    message: string;
    description: string;
  };
}

export interface NotificationInterface {
  openNotification: () => void;
}

export interface AppInterface {
  cartData?: [];
  cart?: [];
  visible?: boolean;
  onclose?: () => void;
  showDrawer?: () => void;
  opennotification?: (e: any) => void;
  addtocart?: (e?: any) => void;
  removefromcart?: (e?: any) => void;
  deletefromcart?: (e?: any) => void;
}
