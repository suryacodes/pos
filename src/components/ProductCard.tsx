import React, { memo } from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Product } from "../services/types";

function ProductCard({ product }: { product: Product }) {
  return (
    <Card style={{ minWidth: 300 }}>
      <CardMedia
        component="img"
        height="140"
        image={product.image}
        alt="Product Image"
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Quantity: {product.qty}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Weight: {product.weight}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default memo(ProductCard);
