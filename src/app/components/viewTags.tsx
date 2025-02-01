// "use client";

// import React, { useReducer, useState } from "react";
// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";
// import { Button } from "primereact/button";
// import { Dialog } from "primereact/dialog";
// import { InputText } from "primereact/inputtext";
// import { reducer, initialState, Tag  } from "../Reducers/viewTagsReducer"; 

// const ViewTags: React.FC = () => {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   const [dialogVisible, setDialogVisible] = useState(false);
//   const [editItem, setEditItem] = useState<Tag | null>(null);

//   // Sample data (replace with API calls)
//   React.useEffect(() => {
//     const sampleData: Tag[] = [
//       { id: 1, name: "Tag 1", description: "Description 1" },
//       { id: 2, name: "Tag 2", description: "Description 2" },
//     ];
//     dispatch({ type: "SET_ITEMS", payload: sampleData });
//   }, []);

//   const handleEdit = (item: Tag) => {
//     setEditItem(item);
//     setDialogVisible(true);
//   };

//   const handleDelete = (id: number) => {
//     dispatch({ type: "DELETE_ITEM", payload: id });
//   };

//   const handleSave = () => {
//     if (editItem) {
//       Object.keys(editItem).forEach((key) => {
//         if (key !== "id") {
//           dispatch({
//             type: "EDIT_ITEM",
//             payload: { id: editItem.id, key, value: (editItem as any)[key] },
//           });
//         }
//       });
//     }
//     setDialogVisible(false);
//     setEditItem(null);
//   };

//   const actionBodyTemplate = (rowData: Tag) => (
//     <>
//       <Button label="Edit" onClick={() => handleEdit(rowData)} className="mr-2" />
//       <Button
//         label="Delete"
//         onClick={() => handleDelete(rowData.id)}
//         className="p-button-danger"
//       />
//     </>
//   );

//   return (
//     <div>
//       <DataTable value={state.items} responsiveLayout="scroll">
//         <Column field="id" header="ID" />
//         <Column field="name" header="Name" />
//         <Column field="description" header="Description" />
//         <Column body={actionBodyTemplate} header="Actions" />
//       </DataTable>

//       <Dialog
//         header="Edit Tag"
//         visible={dialogVisible}
//         style={{ width: "50vw" }}
//         onHide={() => setDialogVisible(false)}
//       >
//         {editItem && (
//           <div className="p-fluid">
//             {Object.keys(editItem).map(
//               (key) =>
//                 key !== "id" && (
//                   <div key={key} className="p-field">
//                     <label htmlFor={key}>{key}</label>
//                     <InputText
//                       id={key}
//                       value={(editItem as any)[key]}
//                       onChange={(e) =>
//                         setEditItem({ ...editItem, [key]: e.target.value })
//                       }
//                     />
//                   </div>
//                 )
//             )}
//           </div>
//         )}
//         <Button label="Save" onClick={handleSave} />
//       </Dialog>
//     </div>
//   );
// };

// export default ViewTags;
"use client";

import React, { useReducer, useState, useContext } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { reducer, initialState, Animal } from "../Reducers/viewTagsReducer"; 
import { AnimalContext, AnimalContextType } from "./customerResourcesContext";

const ViewAnimals: React.FC = () => {
  const { animalData } = useContext<AnimalContextType>(AnimalContext);
  const [state, dispatch] = useReducer(reducer, initialState);

  const [dialogVisible, setDialogVisible] = useState(false);
  const [editItem, setEditItem] = useState<Animal | null>(null);

  // Update state when animalData changes
  React.useEffect(() => {
    if (animalData?.resources?.animals) {
      const animals: Animal[] = animalData.resources.animals.map((animal: any) => ({
        id: animal.animal_number, // Unique identifier
        name: animal.animal_name,
        species: animal.animal_species,
      }));

      dispatch({ type: "SET_ANIMALS", payload: animals });
    }
  }, [animalData]);

  const handleEdit = (item: Animal) => {
    setEditItem(item);
    setDialogVisible(true);
  };

  const handleDelete = (id: string) => {
    dispatch({ type: "DELETE_ANIMAL", payload: id });
  };

  const handleSave = () => {
    if (editItem) {
      Object.keys(editItem).forEach((key) => {
        if (key !== "id") {
          dispatch({
            type: "EDIT_ANIMAL",
            payload: { id: editItem.id, key, value: (editItem as any)[key] },
          });
        }
      });
    }
    setDialogVisible(false);
    setEditItem(null);
  };

  const actionBodyTemplate = (rowData: Animal) => (
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
        <Column field="id" header="Animal Number" />
        <Column field="name" header="Animal Name" />
        <Column field="species" header="Species" />
        <Column body={actionBodyTemplate} header="Actions" />
      </DataTable>

      <Dialog
        header="Edit Animal"
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

export default ViewAnimals;
