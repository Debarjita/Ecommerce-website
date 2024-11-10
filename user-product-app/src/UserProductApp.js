import React, { useState, useEffect } from 'react';
import { 
  Card, CardHeader, CardTitle, CardContent, CardFooter
} from './components/ui/card';
import { 
  Button, Input, Label, Textarea
} from './components/ui/forms';
import { 
  Table, TableHead, TableBody, TableRow, TableCell
} from './components/ui/table';
import { 
  AlertDialog, AlertDialogAction, AlertDialogDescription, AlertDialogTitle
} from './components/ui/alert';
import axios from 'axios';

const API_BASE_URL ='http://localhost:5000/api';

const UserProductApp = () => {
  // User Management State
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
    age: 0,
    name: ''
  });
  const [userToDelete, setUserToDelete] = useState(null);

  // Product Management State  
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    imageUrl: '',
    price: 0,
    priceUnit: 'USD'
  });
  const [productToDelete, setProductToDelete] = useState(null);

  // Alerts
  const [showUserDeleteDialog, setShowUserDeleteDialog] = useState(false);
  const [showProductDeleteDialog, setShowProductDeleteDialog] = useState(false);

  // Fetch Users and Products
  useEffect(() => {
    fetchUsers();
    fetchProducts();
  }, []);

  // User Management Functions
  const fetchUsers = async () => {
    const response = await axios.get(`${API_BASE_URL}/users`);
    setUsers(response.data);
  };

  const createUser = async () => {
    await axios.post(`${API_BASE_URL}/users`, newUser);
    setNewUser({
      username: '',
      email: '',
      password: '',
      age: 0,
      name: ''
    });
    fetchUsers();
  };

  const deleteUser = async () => {
    await axios.delete(`${API_BASE_URL}/users/${userToDelete.id}`);
    setUserToDelete(null);
    setShowUserDeleteDialog(false);
    fetchUsers();
  };

  // Product Management Functions
  const fetchProducts = async () => {
    const response = await axios.get(`${API_BASE_URL}/products`);
    setProducts(response.data);
  };

  const createProduct = async () => {
    await axios.post(`${API_BASE_URL}/products`, newProduct);
    setNewProduct({
      name: '',
      description: '',
      imageUrl: '',
      price: 0,
      priceUnit: 'USD'
    });
    fetchProducts();
  };

  const deleteProduct = async () => {
    await axios.delete(`${API_BASE_URL}/products/${productToDelete.id}`);
    setProductToDelete(null);
    setShowProductDeleteDialog(false);
    fetchProducts();
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">User and Product Management</h1>

      {/* User Management */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">User Management</h2>
        <Card>
          <CardHeader>
            <CardTitle>Create User</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={newUser.username}
                  onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={newUser.age}
                  onChange={(e) => setNewUser({ ...newUser, age: parseInt(e.target.value) })}
                />
              </div>
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={createUser}>Create User</Button>
          </CardFooter>
        </Card>

        <h2 className="text-2xl font-bold my-4">Users</h2>
        <Card>
          <CardContent>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Username</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.age}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>
                      <Button
                        variant="danger"
                        onClick={() => {
                          setUserToDelete(user);
                          setShowUserDeleteDialog(true);
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Product Management */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Product Management</h2>
        <Card>
          <CardHeader>
            <CardTitle>Create Product</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="product-name">Name</Label>
                <Input
                  id="product-name"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="product-description">Description</Label>
                <Textarea
                  id="product-description"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="product-image-url">Image URL</Label>
                <Input
                  id="product-image-url"
                  value={newProduct.imageUrl}
                  onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="product-price">Price</Label>
                <Input
                  id="product-price"
                  type="number"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                />
              </div>
              <div>
                <Label htmlFor="product-price-unit">Price Unit</Label>
                <Input
                  id="product-price-unit"
                  value={newProduct.priceUnit}
                  onChange={(e) => setNewProduct({ ...newProduct, priceUnit: e.target.value })}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={createProduct}>Create Product</Button>
          </CardFooter>
        </Card>

        <h2 className="text-2xl font-bold my-4">Products</h2>
        <Card>
          <CardContent>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.description}</TableCell>
                    <TableCell>
                      <img src={product.imageUrl} alt={product.name} className="w-24 h-24 object-contain" />
                    </TableCell>
                    <TableCell>
                      {product.price} {product.priceUnit}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="danger"
                        onClick={() => {
                          setProductToDelete(product);
                          setShowProductDeleteDialog(true);
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Delete Dialogs */}
      <AlertDialog open={showUserDeleteDialog}>
        <AlertDialogTitle>Delete User</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to delete the user "{userToDelete?.username}"?
        </AlertDialogDescription>
        <AlertDialogAction>
          <Button variant="danger" onClick={deleteUser}>
            Delete
          </Button>
          <Button onClick={() => setShowUserDeleteDialog(false)}>Cancel</Button>
        </AlertDialogAction>
      </AlertDialog>

      <AlertDialog open={showProductDeleteDialog}>
        <AlertDialogTitle>Delete Product</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to delete the product "{productToDelete?.name}"?
        </AlertDialogDescription>
        <AlertDialogAction>
          <Button variant="danger" onClick={deleteProduct}>
            Delete
          </Button>
          <Button onClick={() => setShowProductDeleteDialog(false)}>Cancel</Button>
        </AlertDialogAction>
      </AlertDialog>
    </div>
  );
};

export default UserProductApp;