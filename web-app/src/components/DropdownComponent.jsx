import React, { useEffect, useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';


function DropdownComponent({selected, setSelected}) {

    const months = [
        { id: 0, month: "January" },
        { id: 1, month: "February" },
        { id: 2, month: "March" },
        { id: 3, month: "April" },
        { id: 4, month: "May" },
        { id: 5, month: "June" },
        { id: 6, month: "July" },
        { id: 7, month: "August" },
        { id: 8, month: "September" },
        { id: 9, month: "October" },
        { id: 10, month: "November" },
        { id: 11, month: "December" }
    ]
    

    

    return (
        <div className="mb-2">
            <Dropdown>
                <Dropdown.Toggle variant="info" id="dropdown-basic">
                    {months.find(m => m.id === selected)?.month}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {months.map
                        (
                            monthObject => (
                                <Dropdown.Item key={monthObject.id} onClick={()=> setSelected(monthObject.id)}>
                                    {monthObject.month}
                                </Dropdown.Item>
                            )
                        )
                    }

                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
};
export default DropdownComponent;