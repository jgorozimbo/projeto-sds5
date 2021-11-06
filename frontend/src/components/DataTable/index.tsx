import axios from "axios";
import Pagination from "components/Pagination";
import { useEffect, useState } from "react";
import { SalePage } from "types/Sale";
import { formatLocalDate } from "utils/format";
import { BASE_URL } from "utils/requests";

const DataTable = () => {

    const [activePage, setActivePage] = useState(0);

    const [page, setPage] = useState<SalePage>({
        last: true,
        totalElements: 0,
        totalPages: 0,
        number: 0,
        first: true
    })

    useEffect(() => {
        axios.get(`${BASE_URL}/sales?page=${activePage}&size=10&sort=date,desc`)
            .then(response => {
                setPage(response.data);
            })
    }, [activePage]);

    const changePage = (index: number) => {
        setActivePage(index);
    }

    return (
        <>
            <Pagination page={page} onPageChange={changePage} />
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th>Data</th>
                            <th>Vendedor</th>
                            <th>Clientes visitados</th>
                            <th>Negócios fechados</th>
                            <th>Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            page.content?.map(item => (
                                <tr key={item.id}>
                                    <td>{formatLocalDate(item.date, "dd/MM/yyyy")}</td>
                                    <td>{item.seller.name}</td>
                                    <td>{item.visited}</td>
                                    <td>{item.deals}</td>
                                    <td align="right">{item.amount.toFixed(2)}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default DataTable