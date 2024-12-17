import { Button } from "primereact/button"
import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"
import { Skeleton } from "primereact/skeleton"
import { FormEvent, useEffect, useRef, useState } from "react"
import { ChevronDownIcon } from "primereact/icons/chevrondown"
import { OverlayPanel } from "primereact/overlaypanel"
import { Record, TableData } from "./types"
import { columnData } from "./utils/columnData"
import OverLayPanel from "./components/OverLayPanel"

const App = () => {
    const [tableData, setTableData] = useState<TableData>({
        currentRecords: [],
        totalRecords: 0,
    })
    const [selectedData, setSelectedData] = useState<Record[]>([])
    const [loading, setLoading] = useState(false)
    const [selectedRows, setSelectedRows] = useState(0)
    const [pagination, setPagination] = useState({
        first: 0,
        page: 0,
        rows: 12,
    })

    const overlayRef = useRef<OverlayPanel | null>(null)

    const fetchData = async (page: number, limit: number) => {
        setLoading(true)
        try {
            const response = await fetch(
                `https://api.artic.edu/api/v1/artworks?page=${
                    page + 1
                }&limit=${limit}`
            )
            const jsonData = await response.json()
            const { data, pagination } = jsonData
            const extractedData = data.map(
                ({
                    id,
                    title,
                    place_of_origin,
                    artist_display,
                    inscriptions,
                    date_end,
                    date_start,
                }: Record) => ({
                    id,
                    title,
                    place_of_origin,
                    artist_display,
                    inscriptions,
                    date_end,
                    date_start,
                })
            )
            setTableData({
                currentRecords: extractedData,
                totalRecords: pagination.total,
            })
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const onPage = (event: any) => {
        setPagination({
            first: event.first,
            page: event.page,
            rows: event.rows,
        })
    }

    const handleSubmitRows = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!selectedRows) {
            setSelectedData([])
        } else if (selectedRows < pagination.rows) {
            const rows = []
            for (let i = 0; i < selectedRows; i++) {
                rows.push(tableData.currentRecords[i])
            }
            setSelectedData(rows)
        } else if (selectedRows > pagination.rows) {
        } else {
            setSelectedData(tableData.currentRecords)
        }

        if (overlayRef.current) {
            overlayRef.current.hide()
        }
    }

    useEffect(() => {
        fetchData(pagination.page, pagination.rows)
    }, [pagination])

    return (
        <div>
            <div style={{ padding: "1rem" }}>
                <DataTable
                    value={tableData.currentRecords}
                    selectionMode="multiple"
                    selection={selectedData}
                    onSelectionChange={(e) => setSelectedData(e.value)}
                    dataKey="id"
                    tableStyle={{ minWidth: "50rem" }}
                    lazy
                    paginator
                    totalRecords={tableData.totalRecords}
                    onPage={onPage}
                    first={pagination.first}
                    rows={pagination.rows}
                    rowsPerPageOptions={[5, 12, 30, 50]}
                >
                    <Column
                        selectionMode={loading ? undefined : "multiple"}
                        headerStyle={{
                            width: "3rem",
                        }}
                    />
                    {columnData.map((column) => (
                        <Column
                            key={column.id}
                            field={column.field}
                            header={
                                column.field === "title" ? (
                                    <div>
                                        <Button
                                            type="button"
                                            disabled={loading}
                                            onClick={(e) =>
                                                overlayRef.current?.toggle(e)
                                            }
                                            outlined
                                            icon={<ChevronDownIcon />}
                                            style={{ marginRight: "8px" }}
                                        />
                                        <OverLayPanel
                                            overlayRef={overlayRef}
                                            handleSubmitRows={handleSubmitRows}
                                            selectedRows={selectedRows}
                                            setSelectedRows={setSelectedRows}
                                        />

                                        {column.header}
                                    </div>
                                ) : (
                                    column.header
                                )
                            }
                            style={{
                                padding: "10px",
                                maxWidth: "500px",
                            }}
                            body={loading ? <Skeleton /> : undefined}
                        />
                    ))}
                </DataTable>
            </div>
        </div>
    )
}

export default App
