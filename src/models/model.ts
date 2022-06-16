export interface ItemInterface {
  items?: any;
}

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
  cart?: [];
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

export interface CartDrawerInterface {
  visible: boolean;
  onClose: () => void;
}
