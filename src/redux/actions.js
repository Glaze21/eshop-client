import { client, Field, Query } from "@tilework/opus";

export const setAllCurrencies = () => async (dispatch) => {
  const query = new Query("currencies", true);
  const queryResult = await client.post(query);
  dispatch({
    type: "SET_ALLCURRENCIES",
    payload: queryResult.currencies,
  });
};

export const setCurrency = (curr) => async (dispatch) => {
  dispatch({
    type: "SET_CURRENCY",
    payload: curr,
  });
};

export const setCategory = (cat) => async (dispatch) => {
  dispatch({
    type: "SET_CATEGORY",
    payload: cat,
  });
};

export const setAllCategories = () => async (dispatch) => {
  const query = new Query("categories").addField(new Field("name"));
  const queryResult = await client.post(query);

  var data = [];
  for (const category of queryResult.categories) {
    data.push(category.name);
  }
  dispatch({
    type: "SET_ALLCATEGORIES",
    payload: data,
  });
};

export const setAllProducts = (cat, history) => async (dispatch) => {
  const query = new Query("category")
    .addArgument("input", "CategoryInput", { title: cat })
    .addField("name")
    .addField(
      new Field("products")
        .addField("id")
        .addField("brand")
        .addField("name")
        .addField("inStock")
        .addField("gallery")
        .addField(new Field("prices").addField("currency").addField("amount"))
    );
  const queryResult = await client.post(query);

  if (queryResult.category === null) {
    throw new Error("Category is null");
  }

  var data = [];

  for (const product of queryResult.category.products) {
    data.push({
      id: product.id,
      name: product.name,
      brand: product.brand,
      prices: product.prices,
      picture: product.gallery[0],
      inStock: product.inStock,
    });
  }
  dispatch({
    type: "SET_ALLPRODUCTS",
    payload: data,
  });
};

export const setProduct = (id) => async (dispatch) => {
  const query = new Query("product")
    .addArgument("id", "String!", id)
    .addField("name")
    .addField("id")
    .addField("inStock")
    .addField("gallery")
    .addField("description")
    .addField("category")
    .addField(
      new Field("attributes")
        .addField("id")
        .addField("name")
        .addField("type")
        .addField(
          new Field("items")
            .addField("displayValue")
            .addField("value")
            .addField("id")
        )
    )
    .addField(new Field("prices").addField("currency").addField("amount"))
    .addField("brand");
  const queryResult = await client.post(query);
  dispatch({
    type: "SET_PRODUCT",
    payload: queryResult.product,
  });
};

export const resetProduct = () => (dispatch) => {
  dispatch({
    type: "RESET_PRODUCT",
  });
};

export const addToCart = (item) => (dispatch, getState) => {
  var data = [];
  var newItem = true;

  getState().root.cart.forEach((_item) => {
    if (
      _item.id === item.id &&
      JSON.stringify(_item.selectedAttributes) ===
        JSON.stringify(item.selectedAttributes)
    ) {
      _item.amount += 1;
      newItem = false;
    }

    data.push(_item);
  });
  if (newItem) {
    data.push(item);
  }

  dispatch({
    type: "ADD_TO_CART",
    payload: data,
  });
};

export const removeFromCart = (item) => (dispatch, getState) => {
  var data = [];
  var removeItem = false;

  getState().root.cart.forEach((_item) => {
    if (
      _item.id === item.id &&
      JSON.stringify(_item.selectedAttributes) ===
        JSON.stringify(item.selectedAttributes)
    ) {
      if (item.amount > 1) {
        _item.amount -= 1;
      } else if (item.amount === 1) {
        removeItem = true;
      }
    }
    if (!removeItem) {
      data.push(_item);
    }
    removeItem = false;
  });

  dispatch({
    type: "ADD_TO_CART",
    payload: data,
  });
};

export const changeAttribute = (oldItem, newItem) => (dispatch, getState) => {
  var obj = checkForDuplicates(newItem, getState().root.cart);
  var data = [];

  if (obj.isDuplicate) {
    data.push(obj.newItem);
  }

  getState().root.cart.forEach((_item) => {
    if (
      _item.id === oldItem.id &&
      JSON.stringify(_item.selectedAttributes) ===
        JSON.stringify(oldItem.selectedAttributes)
    ) {
      if (!obj.isDuplicate) {
        data.push(newItem);
      }
    } else {
      data.push(_item);
    }
  });

  dispatch({
    type: "ADD_TO_CART",
    payload: data,
  });
};

const checkForDuplicates = (newItem, cart) => {
  var isDuplicate = false;
  var multipleItemArr = [];
  cart.forEach((_item) => {
    if (
      _item.id === newItem.id &&
      JSON.stringify(_item.selectedAttributes) ===
        JSON.stringify(newItem.selectedAttributes)
    ) {
      multipleItemArr.push(_item);
    }
  });
  if (multipleItemArr.length > 1) {
    isDuplicate = true;
    multipleItemArr[0].amount += multipleItemArr[1].amount;
    newItem.amount = multipleItemArr[0].amount;
  }
  return { isDuplicate, newItem };
};
