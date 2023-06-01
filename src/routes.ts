import SignIn from "./features/auth/SignIn";
import Main from "./pages/Main/Main";
import Products from "./pages/Products/Products";
import Cart from "./pages/Cart/Cart";
import Product from "./pages/Products/Product";
import UnknownProduct from "./pages/UnknownProduct/UnknownProduct";
import Compare from "./pages/Compare/Compare";

const routing = {
    publicRoutes: [
        {path: 'sign-in', element: SignIn}
    ],
    privateRoutes: [
        {path: '/', element: Main},
        {path: '/cart', element: Cart},
        {path: '/products/:category', element: Products},
        {path: '/products/:category/:product_id', element: Product},
        {path: '/products/compare', element: Compare},
        {path: '/unknown', element: UnknownProduct},
    ],
}

export default routing