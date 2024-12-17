import { Button } from "primereact/button"
import { InputNumber } from "primereact/inputnumber"
import { OverlayPanel } from "primereact/overlaypanel"
import { OverLayPanelType } from "../types"
import React from "react"

const OverLayPanel: React.FC<OverLayPanelType> = ({
    overlayRef,
    selectedRows,
    setSelectedRows,
    handleSubmitRows,
}) => {
    return (
        <OverlayPanel
            ref={overlayRef}
            style={{
                marginLeft: "1rem",
                marginTop: "8px",
                padding: "8px",
            }}
        >
            <form onSubmit={handleSubmitRows}>
                <label
                    htmlFor="num-rows"
                    style={{
                        display: "inline-block",
                        marginBottom: "8px",
                    }}
                >
                    Select Rows
                </label>
                <InputNumber
                    mode="decimal"
                    value={selectedRows}
                    onValueChange={(e) => setSelectedRows(Number(e.value))}
                    style={{
                        display: "block",
                    }}
                    inputId="num-rows"
                    inputStyle={{
                        padding: "8px",
                    }}
                />
                <Button
                    style={{
                        padding: "4px",
                        float: "right",
                        marginTop: "6px",
                    }}
                    type="submit"
                    outlined
                >
                    Submit
                </Button>
            </form>
        </OverlayPanel>
    )
}

export default OverLayPanel
