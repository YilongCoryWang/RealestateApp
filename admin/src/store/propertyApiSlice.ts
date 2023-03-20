import apiSlice from "./apiSlice";
import { AddProperty, PropertyListResponse, PropertyDetails, PropertyDetailsResponse } from "../models/perperty";

const propertyApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProperties: builder.query<PropertyListResponse, void>({
      query: () => "/property/getProperties",
      keepUnusedDataFor: 5,
    }),
    getPropertyById: builder.query<PropertyDetailsResponse, string>({
      query: (id) => `/property/${id}`,
      keepUnusedDataFor: 5,
    }),
    updateProperty: builder.mutation<string, PropertyDetails>({
      query: (property) => ({
        url: '/property/update',
        method: 'POST',
        body: property
      }),
    }),
    addProperty: builder.mutation<string, AddProperty>({
      query: (property) => ({
        url: '/property/add',
        method: 'POST',
        body: property
      })
    }),
    deleteProperty: builder.mutation<string, string>({
      query: (id) => ({
        url: `/property/delete/${id}`,
        method: 'DELETE',
      })
    }),
  }),
});

export const { useGetPropertiesQuery, useGetPropertyByIdQuery, useAddPropertyMutation, useDeletePropertyMutation, useUpdatePropertyMutation } = propertyApiSlice;
