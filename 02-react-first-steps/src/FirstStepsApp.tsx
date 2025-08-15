import { ItemCounter } from "./shopping-cart/ItemCounter";

interface ItemInCart {
  id: number;
  productName: string;
  quantity: number;
}

const itemsInCart: ItemInCart[] = [
  {
    id: 1,
    productName: "Play Station 5",
    quantity: 1,
  },
  {
    id: 2,
    productName: "Xbox Series X",
    quantity: 5,
  },
  {
    id: 3,
    productName: "Nintendo Switch 2",
    quantity: 2,
  },
];

export function FirstStepsApp() {
  return (
    <>
      <h1>Carrito de compras</h1>
      {itemsInCart.map((item) => (
        <ItemCounter
          key={item.id}
          product={item.productName}
          quantity={item.quantity}
        />
      ))}
    </>
  );
}
