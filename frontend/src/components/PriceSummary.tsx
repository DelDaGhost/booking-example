export default function PriceSummary({ price }: { price: number }) {
    return (
        <div className="border-t pt-4">
            <h2 className="text-lg font-medium">💰 Total Price</h2>
            <p className="text-xl font-bold">{price} €</p>
        </div>
    );
}
