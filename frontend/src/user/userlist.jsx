import axios from "axios";
import {
  Table,
  TableHead,
  TableBody,
  TableHeadCell,
  TableRow,
  TableCell,
  Button,
} from "flowbite-react";
import { toast } from "react-toastify";

export function UserList({ data = [], getAllUser, Swal, setFormData }) {
  const deleteRow = (delid) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton:
          "bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded mx-2",
        cancelButton:
          "bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded mx-2",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`http://localhost:5000/api/user/deleteUser/${delid}`)
            .then(() => {
              toast.success(`User deleted`);
              getAllUser();
            });
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "User has been deleted.",
            icon: "success",
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your user data is safe :)",
            icon: "error",
          });
        }
      });
  };

  const editRow = (editid) => {
    axios
      .get(`http://localhost:5000/api/user/singleUser/${editid}`)
      .then((res) => {
        setFormData(res.data.user);
      });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        User List
      </h2>

      <div className="overflow-x-auto">
        <Table hoverable={true}>
          <TableHead>
            <TableRow>
              <TableHeadCell>#</TableHeadCell>
              <TableHeadCell>Name</TableHeadCell>
              <TableHeadCell>Email</TableHeadCell>
              <TableHeadCell>Phone No</TableHeadCell>
              <TableHeadCell>CNIC No</TableHeadCell>
              <TableHeadCell>Address</TableHeadCell>
              <TableHeadCell className="text-center">Actions</TableHeadCell>
            </TableRow>
          </TableHead>

          <TableBody className="divide-y">
            {Array.isArray(data) && data.length > 0 ? (
              data.map((item, index) => (
                <TableRow
                  key={item._id || index}
                  className="bg-white dark:bg-gray-800"
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.phone}</TableCell>
                  <TableCell>{item.cnic}</TableCell>
                  <TableCell>{item.address}</TableCell>
                  <TableCell>
                    <div className="flex justify-center gap-2">
                      <Button
                        className=" px-4 bg-red-500 hover:bg-red-600 text-white"
                        size="xs"
                        onClick={() => deleteRow(item._id)}
                      >
                        Delete
                      </Button>
                      <Button
                        className=" px-4 bg-green-500 hover:bg-green-600 text-white"
                        size="xs"
                        onClick={() => editRow(item._id)}
                      >
                        Edit
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-6 text-gray-500"
                >
                  No Data Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
