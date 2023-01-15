import { SET_COUNTRIES, SET_PRODUCTS, SET_CURRENCIES, INCREASE_PRODUCT_VALUE, DECREASE_PRODUCT_VALUE} from './actions';

const initialState = {
  countries: [],
  products: [
    {id: 1, brand: 'Nike', price: 100.00, model: 'Blazer Mid 77 Vintage', selected: false, wish: false,value: 1,
        imgSrc: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/389b709e-5102-4e55-aa5d-07099b500831/blazer-mid-77-vintage-mens-shoes-nw30B2.png'},
    {id: 2, brand: 'Nike', price: 200.00, model: 'Air Vapormax 2021 FK', selected: false, wish: false,value: 1,
        imgSrc: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/c1d66374-cbcb-456d-a842-f7c14cb6e9d0/air-vapormax-2021-fk-mens-shoes-NpTfFz.png'},
    {id: 3, brand: 'Nike', price: 170.00, model: 'Air Max 95 Men\'s Shoes', selected: false, wish: false,value: 1,
        imgSrc: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/3de64b00-0714-426b-926b-e97cceb813bb/air-max-95-mens-shoes-95JNSF.png'},
    {id: 4, brand: 'Nike', price: 120.00, model: 'Freak 3 Basketball Shoes', selected: false, wish: false,value: 1,
        imgSrc: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/9ce15158-11a1-4b64-a10f-f8ec68320a2b/zoom-freak-3-basketball-shoes-QXBvM0.png'},
    {id: 5, brand: 'Nike', price: 120.00, model: 'Space Hippie 04 Men\'s Shoes', selected: false, wish: false,value: 1,
        imgSrc: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/b1a26131-54d3-4589-9343-e75ea8825841/space-hippie-04-mens-shoes-gGWDLk.png'},
    {id: 6, brand: 'Nike', price: 123.97, model: 'Air Max 90 Men\'s Shoes', selected: false, originalPrice: 130.00, wish: false,value: 1,
        imgSrc: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/bhwrvokud9flh34cchb8/air-max-90-mens-shoes-6n3vKB.png'},
    {id: 7, brand: 'Nike', price: 90.00, model: 'Air Force 1 \'07 Men\'s Shoes', selected: false, originalPrice: 130.00, wish: false,value: 1,
        imgSrc: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/21d38052-598b-44f6-a857-123c9f72b015/air-force-1-07-mens-shoes-5QFp5Z.png'},
    {id: 8, brand: 'Nike', price: 142.97, model: 'Air Max 270 Men\'s Shoes', selected: false, originalPrice: 150.00, wish: false,value: 1,
        imgSrc: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/cc3a56f0-764b-43d3-a0d5-3c33bc2fef3b/air-max-270-mens-shoes-KkLcGR.png'},
    {id: 9, brand: 'Nike', price: 130.00, model: 'Air Presto Men\'s Shoes', selected: false, wish: false,value: 1,
        imgSrc: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/94f2017d-3be3-4d8e-b3a3-a618c443166e/air-presto-mens-shoes-JlLlWz.png'},
    {id: 10, brand: 'Jordan', price: 118.97, model: 'MA2 Shoes', selected: false, originalPrice: 125.00, wish: false,value: 1,
        imgSrc: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/fd46e53a-61b9-4a1f-be4f-7aa73c21b7a4/jordan-ma2-shoes-VfLVbR.png'},
    {id: 11, brand: 'Nike', price: 100.00, model: 'Free Run 5.0 Men\'s Road Running Shoes', selected: false, wish: false,value: 1,
        imgSrc: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/3108f319-4f10-4728-9965-e94e0885f688/free-run-5-mens-road-running-shoes-mL8SDd.png'},
    {id: 12, brand: 'Jordan', price: 100.00, model: 'Air NFH Shoes', selected: false, wish: false,value: 1,
        imgSrc: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/25afe220-e5dd-4f21-8e23-22b1522a03f5/jordan-air-nfh-shoes-Ktzw9P.png'}
],
currency: [],
}

export const reducer = (state = initialState, action) => {
  switch(action.type) {

    case SET_COUNTRIES:
      return {
      ...state,
      countries: action.payload  
    }

    case SET_PRODUCTS:
      return {
      ...state,
      products: action.payload
    }

    case SET_CURRENCIES:
      return {
      ...state,
      currency: action.payload
    }

    case INCREASE_PRODUCT_VALUE:
      return {
        ...state,
        products: state.products.map(product => {
          if(product.id === action.payload) {
            return {
             ...product,
              value: product.value + 1
          }
        } else return product
        })
      }

    case DECREASE_PRODUCT_VALUE:
      return {
        ...state,
        products: state.products.map(product => {
          if(product.id === action.payload) {
            return {
             ...product,
              value: product.value === 1 ? product.value : product.value - 1 
          }
        } else return product
        })
      }

    default:
      return state;
  }

}