import classes from "./ShoppingList.module.css";
import Button from "../components/ui/Button";
import { fetchBooks, useAddToCartMutation, useGetCartQuery } from "../store";
import Grid from "../components/ui/Grid";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/ui/Pagination";
import { useCallback, useEffect, useState } from "react";
import { useToast } from "../hooks/useToast";
import {
  FormControl,
  Rating,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Input from "../components/ui/Input";
import Card from "../components/ui/Card";
import { priceRange } from "./formStructure";
import { useThunk } from "../hooks/useThunk";
import { useDebounce } from "../hooks/useDebounce";
import book from "../images/book1.jpg";

let PageSize = 6;

export default function ShoppingList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [maxRange, setMaxRange] = useState(0);
  const [minRange, setMinRange] = useState(0);
  const [search, setSearch] = useState("");
  const [rating, setRating] = useState(0);

  const debouncedMaxRange = useDebounce(maxRange);
  const debouncedMinRange = useDebounce(minRange);
  const debouncedSearch = useDebounce(search);
  const debouncedRating = useDebounce(rating);

  const { showToast, ToastContainer } = useToast();

  const [doFetchBooks, isLoading, error] = useThunk(fetchBooks);

  const advancedFetchBooks = useCallback(
    (reset) => {
      if (reset)
        return doFetchBooks({
          page: currentPage,
          limit: PageSize,
        });
      const query = {};
      if (debouncedMaxRange) query["price[lte]"] = debouncedMaxRange;
      if (debouncedMinRange) query["price[gte]"] = debouncedMinRange;
      if (debouncedRating) query["averageRating[gte]"] = debouncedRating;
      if (debouncedSearch) query.search = debouncedSearch;
      return doFetchBooks({
        ...query,
        page: currentPage,
        limit: PageSize,
      });
    },
    [
      doFetchBooks,
      debouncedMaxRange,
      debouncedMinRange,
      debouncedRating,
      debouncedSearch,
      currentPage,
    ]
  );

  useEffect(() => {
    advancedFetchBooks();
  }, [advancedFetchBooks, currentPage]);

  const { isLoggedIn, data } = useSelector((state) => ({
    isLoggedIn: state.loginStatus.isLoggedIn,
    data: state.booksApi,
  }));

  const cartResults = useGetCartQuery({}, { skip: !isLoggedIn });

  const [doAddToCart] = useAddToCartMutation();

  const navigate = useNavigate();

  const handleReset = () => {
    setMaxRange(0);
    setMinRange(0);
    setSearch("");
    setRating(0);
    return advancedFetchBooks(true);
  };

  const addToCartHandler = async (item) => {
    if (!isLoggedIn) return navigate("/signin");

    const cartItems = cartResults?.data?.items
      ? cartResults?.data?.items.map((i) => ({
          quantity: i.quantity,
          book: i.book._id,
        }))
      : [];

    const itemExists = cartItems.find((ci) => ci.book === item._id);
    if (itemExists) {
      itemExists.quantity = itemExists.quantity + 1;
    } else {
      cartItems.push({ quantity: 1, book: item._id });
    }

    try {
      await doAddToCart({
        items: cartItems,
      }).unwrap();
      showToast("Item added to Cart", "success");
    } catch (err) {
      showToast("Error adding items to cart", "error");
    }
  };

  const renderFn = (item) => {
    return (
      <div className={classes["grid-item"]}>
        <div className={classes.header}>
          <h3>{item.title}</h3>
          <img className={classes.image} src={book} alt="" />
        </div>
        <h4>Authors - {item.authors.join(", ")}</h4>
        <h4>Price - ${item.price}</h4>
        <div className={classes["book-footer"]}>
          <Button onClick={() => addToCartHandler(item)} primary>
            {" "}
            Add to Cart
          </Button>
          <div className={classes["item-rating"]}>
            <strong>Rating - </strong>{" "}
            <Rating
              name="rating"
              size="small"
              value={item.averageRating}
              readOnly
            />
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to fetch</div>;

  if (data?.data?.data)
    return (
      <div className={classes.shoppinglist}>
        <Card className={classes.filters}>
          <Input
            className={classes.search}
            label="Search"
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            disableDefaultStyle
          />
          <div className={classes.price}>
            <h3>Price Range - </h3>{" "}
            <div className={classes.ranges}>
              {priceRange.map((input) => (
                <Input
                  key={input.id}
                  {...input}
                  className={classes["price-range-input"]}
                  disableDefaultStyle
                  value={input.name === "minrange" ? minRange : maxRange}
                  onChange={
                    input.name === "minrange"
                      ? (e) => setMinRange(e.target.value)
                      : (e) => setMaxRange(e.target.value)
                  }
                />
              ))}
            </div>
          </div>
          <div className={classes.ratingSearch}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Rating</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={rating}
                label="Rating"
                onChange={(e) => setRating(e.target.value)}
              >
                <MenuItem value={1}>1 star or more</MenuItem>
                <MenuItem value={2}>2 star or more</MenuItem>
                <MenuItem value={3}>3 star or more</MenuItem>
                <MenuItem value={4}>4 star or more</MenuItem>
                <MenuItem value={5}>5 star or more</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className={classes["filter-action"]}>
            <Button onClick={handleReset} danger>
              Reset
            </Button>
          </div>
        </Card>
        <Grid
          data={data.data.data}
          keyFn={(item) => item._id}
          renderFn={renderFn}
        />
        <Pagination
          currentPage={data.data.currentPage}
          totalCount={data.data.totalCount}
          pageSize={data.data.limit}
          onPageChange={(page) => setCurrentPage(page)}
        />
        <ToastContainer />
      </div>
    );
}
