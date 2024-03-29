import { Request, Response, Router } from "express"
import { AuthenticatedUser, Login, Logout, Register, UpdateInfo, UpdatePassword } from "./controller/auth.controller"
import { Ambassadors } from "./controller/user.controller"
import { AuthMiddleware } from "./middlleware/auth.middlleware"
import { Products,CreateProduct,GetProduct,UpdateProduct,DeleteProduct } from "./controller/product.controller"
import { Links } from "./controller/link.controller"
import { Orders } from "./controller/order.controller"
export const routes = (router: Router) => {
    router.post('/api/admin/register', Register)
    router.post('/api/admin/login', Login)
    router.get('/api/admin/user', AuthMiddleware, AuthenticatedUser)
    router.post('/api/admin/logout', AuthMiddleware, Logout)
    router.put('/api/admin/users/info', AuthMiddleware, UpdateInfo);
    router.put('/api/admin/users/password', AuthMiddleware, UpdatePassword);
    // Seed ambassador Routes
    router.get('/api/admin/ambassadors', AuthMiddleware, Ambassadors);
    // products
    router.get('/api/admin/products', AuthMiddleware, Products);
    router.post('/api/admin/products', AuthMiddleware, CreateProduct);
    router.get('/api/admin/products/:id', AuthMiddleware, GetProduct);
    router.put('/api/admin/products/:id', AuthMiddleware, UpdateProduct);
    router.delete('/api/admin/products/:id', AuthMiddleware, DeleteProduct);
    // links
    router.get('/api/admin/users/:id/links', AuthMiddleware, Links);
    router.get('/api/admin/orders', AuthMiddleware, Orders);
    // ambassador routes
    router.post('/api/ambassador/register', Register)
    router.post('/api/ambassador/login', Login)
    router.get('/api/ambassador/user', AuthMiddleware, AuthenticatedUser)
    router.post('/api/ambassador/logout', AuthMiddleware, Logout)
    router.put('/api/ambassador/users/info', AuthMiddleware, UpdateInfo);
    router.put('/api/ambassador/users/password', AuthMiddleware, UpdatePassword);
    
} 