import React, { forwardRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/Store";
import { fetchProductAsyc } from "../../store/Reducer";
import styled from "styled-components";
import { ProductCard } from "../../components";
import InfiniteScroll from "../../components/InfiniteScroll";

const Container = styled.div`
  background-color: #f4f4f4;
  padding: 16px;
  height: calc(100vh - 32px);
  overflow-y: auto;
`;

const ScrollView = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

const Products = forwardRef<HTMLDivElement, { isIntersecting: boolean }>(
  ({ isIntersecting }, eleRef) => {
    const productData = useSelector((state: RootState) => state.product);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
      isIntersecting &&
        (() => {
          if (
            !productData.isLoading &&
            (currentPage <= productData.totalPages ||
              productData.totalPages === 0)
          ) {
            dispatch(fetchProductAsyc(currentPage));
            setCurrentPage((prev) => prev + 1);
          }
        })();
    }, [isIntersecting]);

    return (
      <Container>
        <ScrollView>
          {productData.products.map((product, index) => (
            <ProductCard product={product} key={index} />
          ))}
        </ScrollView>
        <div style={{ padding: 50 }} ref={eleRef}>
          {(currentPage <= productData.totalPages ||
            productData.totalPages === 0) && <h4> Loading....</h4>}
        </div>
      </Container>
    );
  }
);

export default InfiniteScroll(Products, { threshold: 0.5 });
