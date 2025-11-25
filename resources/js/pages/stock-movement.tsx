import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Stock } from '@/types';
import { Head } from '@inertiajs/react';

export default function StockMovement({stocks}: {stocks: Stock[]}) {
    return (
        <AppLayout>
            <Head title="Product Management" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Table>
                    <TableCaption>Recent stock movement history.</TableCaption>

                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[180px]">Item</TableHead>
                            <TableHead>Movement</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>User</TableHead>
                            <TableHead className="text-right">Date</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {stocks.map((stock) => (
                            <TableRow key={stock.id}>
                                <TableCell className="font-medium">
                                    {stock.product.name}
                                </TableCell>

                                <TableCell
                                    className={
                                        stock.movement_type === 'in'
                                            ? 'font-semibold text-green-600 capitalize'
                                            : 'font-semibold text-red-600 capitalize'
                                    }
                                >
                                    Movement {stock.movement_type}
                                </TableCell>

                                <TableCell>{stock.quantity}</TableCell>

                                <TableCell>
                                    {
                                    stock.user.role === 'admin' && stock.movement_type === 'in'
                                        ? 'Stock Added by Admin'
                                    : stock.user.role === 'admin' && stock.movement_type === 'out'
                                        ? 'Stock Removed by Admin'
                                    : stock.user.role === 'user' && stock.movement_type === 'out'
                                        ? 'Stock bought by User'
                                    : 'Unknown Action'}
                                </TableCell>

                                <TableCell className="text-right">
                                    {new Date(stock.created_at).toLocaleDateString(
                                        undefined,
                                        {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        }
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={4}>Total Movements</TableCell>
                            <TableCell className="text-right">
                                {stocks.length}
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        </AppLayout>
    );
}
