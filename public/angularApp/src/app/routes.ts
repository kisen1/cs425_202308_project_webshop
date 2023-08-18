import { environment } from "src/environments/environment";
import { AddProductComponent } from "./add-product/add-product.component";
import { ErrorComponent } from "./error/error.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { ProductsComponent } from "./products/products.component";
import { RegisterComponent } from "./register/register.component";
import { SingleProductComponent } from "./single-product/single-product.component";
import { SingleReviewComponent } from "./single-review/single-review.component";
import { UpdateProductComponent } from "./update-product/update-product.component";
import { ProfileComponent } from "./profile/profile.component";

export const routes = [
    {
        path: "",
        component: HomeComponent
      },
      {
        path: environment.ADD_PRODUCT_URL,
        component: AddProductComponent
      },
      {
        path: environment.PRODUCTS_URL,
        component: ProductsComponent
      },
      {
        path: environment.REGISTER_URL,
        component: RegisterComponent
      },
      {
        path: environment.LOGIN_URL,
        component: LoginComponent
      },
      {
        path: environment.PROFILE_URL,
        component: ProfileComponent
      },
      {
        path: environment.SINGLE_PRODUCT_URL + "/:" + environment.PRODUCT_ID + "/" + environment.REVIEWS_URL +"/:" + environment.REVIEW_ID,
        component: SingleReviewComponent
      },
      {
        path: environment.UPDATE_PRODUCT_URL + "/:" + environment.PRODUCT_ID,
        component: UpdateProductComponent
      },
      {
        path: environment.SINGLE_PRODUCT_URL + "/:" + environment.PRODUCT_ID,
        component: SingleProductComponent
      },
      {
        path:"**",
        component: ErrorComponent
      }
]