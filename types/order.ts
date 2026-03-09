export interface OrderConfirmation {
  order_id: string;
  customer_email: string;
  items: {
    product_name: string;
    /** Price in EUR cents */
    price: number;
    download_url: string;
  }[];
  /** Total in EUR cents */
  total: number;
}
