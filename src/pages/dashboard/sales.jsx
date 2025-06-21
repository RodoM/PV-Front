import { useState, useEffect } from "react";
import api from "@/lib/axios";
import DataTable from "@/components/ui/data-table";
import { columns } from "@/components/dashboard/sales/sales-columns";

function Sales() {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);
    api
      .get("/sale/list", { params: { pageNumber, pageSize } })
      .then((res) => {
        const { data } = res.data;
        setData(data.data);
        setPageCount(data.totalPages);
        console.log(data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [pageNumber, pageSize]);

  return (
    <>
      <DataTable
        columns={columns}
        loading={loading}
        data={data}
        pageSize={pageSize}
        pageNumber={pageNumber}
        pageCount={pageCount}
        onPageChange={(pageNumber) => setPageNumber(pageNumber)}
        onPageSizeChange={(pageSize) => setPageSize(pageSize)}
      />
    </>
  );
}

export default Sales;
