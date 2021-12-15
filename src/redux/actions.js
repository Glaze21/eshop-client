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

export const setAllProducts = (cat) => async (dispatch) => {
  const query = new Query("category")
    .addArgument("input", "CategoryInput", { title: cat })
    .addField("name")
    .addField(
      new Field("products")
        .addField("id")
        .addField("name")
        .addField("inStock")
        .addField("gallery")
        .addField(new Field("prices").addField("currency").addField("amount"))
    );
  const queryResult = await client.post(query);

  var data = [];
  for (const product of queryResult.category.products) {
    data.push({
      id: product.id,
      name: product.name,
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

export const addToCart = (item, increase) => (dispatch, getState) => {
  var data = [];
  var total = [];
  var newItem = true;
  var removeItem = false;

  getState().root.cart.forEach((_item) => {
    if (_item.id === item.id) {
      if (increase) {
        _item.amount += 1;
      } else if (increase === false && item.amount > 1) {
        _item.amount -= 1;
      } else if (increase === false && item.amount === 1) {
        removeItem = true;
      }
      newItem = false;
    }
    if (!removeItem) {
      data.push(_item);
    }
    removeItem = false;
  });
  if (newItem) {
    data.push(item);
  }

  dispatch({
    type: "ADD_TO_CART",
    payload: data,
  });

  if (data.length > 0) {
    data[0].prices.forEach((price) => {
      total.push({ currency: price.currency, amount: 0 });
    });
    data.forEach((_item) => {
      _item.prices.forEach((price) => {
        var index = total.findIndex((i) => i.currency === price.currency);
        total[index].amount += price.amount * _item.amount;
      });
    });
  }

  dispatch({
    type: "ADD_TO_CART_TOTAL",
    payload: total,
  });
};
