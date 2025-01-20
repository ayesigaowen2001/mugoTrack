"use client";

import React, { useReducer, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { reducer, initialState, Tag  } from "../Reducers/viewTagsReducer"; 

const ViewTags: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [dialogVisible, setDialogVisible] = useState(false);
  const [editItem, setEditItem] = useState<Tag | null>(null);

  // Sample data (replace with API calls)
  React.useEffect(() => {
    const sampleData: Tag[] = [
      { id: 1, name: "Tag 1", description: "Description 1" },
      { id: 2, name: "Tag 2", description: "Description 2" },
    ];
    dispatch({ type: "SET_ITEMS", payload: sampleData });
  }, []);

  const handleEdit = (item: Tag) => {
    setEditItem(item);
    setDialogVisible(true);
  };

  const handleDelete = (id: number) => {
    dispatch({ type: "DELETE_ITEM", payload: id });
  };

  const handleSave = () => {
    if (editItem) {
      Object.keys(editItem).forEach((key) => {
        if (key !== "id") {
          dispatch({
            type: "EDIT_ITEM",
            payload: { id: editItem.id, key, value: (editItem as any)[key] },
          });
        }
      });
    }
    setDialogVisible(false);
    setEditItem(null);
  };

  const actionBodyTemplate = (rowData: Tag) => (
    <>
      <Button label="Edit" onClick={() => handleEdit(rowData)} className="mr-2" />
      <Button
        label="Delete"
        onClick={() => handleDelete(rowData.id)}
        className="p-button-danger"
      />
    </>
  );

  return (
    <div>
      <DataTable value={state.items} responsiveLayout="scroll">
        <Column field="id" header="ID" />
        <Column field="name" header="Name" />
        <Column field="description" header="Description" />
        <Column body={actionBodyTemplate} header="Actions" />
      </DataTable>

      <Dialog
        header="Edit Tag"
        visible={dialogVisible}
        style={{ width: "50vw" }}
        onHide={() => setDialogVisible(false)}
      >
        {editItem && (
          <div className="p-fluid">
            {Object.keys(editItem).map(
              (key) =>
                key !== "id" && (
                  <div key={key} className="p-field">
                    <label htmlFor={key}>{key}</label>
                    <InputText
                      id={key}
                      value={(editItem as any)[key]}
                      onChange={(e) =>
                        setEditItem({ ...editItem, [key]: e.target.value })
                      }
                    />
                  </div>
                )
            )}
          </div>
        )}
        <Button label="Save" onClick={handleSave} />
      </Dialog>
    </div>
  );
};

export default ViewTags;
