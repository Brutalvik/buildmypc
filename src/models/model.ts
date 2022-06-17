export interface CartInterface {
  id: string;
  name: string;
  brand: string;
  clock: string;
  socket: string;
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
  setCart?: any;
  visible?: boolean;
  onClose?: () => void;
  showDrawer?: () => void;
  openNotification?: (e: any) => void;
  addToCart?: (e?: any) => void;
  removeFromCart?: (e?: any) => void;
}
