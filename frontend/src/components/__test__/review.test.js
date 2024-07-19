import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ReviewPage from "../ReviewPage/ReviewPage";

describe("ReviewPage Component", () => {
  test("renders ReviewPage component", () => {
    render(<ReviewPage />);
    const reviewTitle = screen.getByText(/Review Us/i);
    expect(reviewTitle).toBeInTheDocument();
  });

  test("submit review form with valid data", async () => {
    render(<ReviewPage />);

    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Role/i), {
      target: { value: "Seller" },
    });
    fireEvent.change(screen.getByLabelText(/Comment/i), {
      target: { value: "Great experience with the service!" },
    });

    const submitButton = screen.getByRole("button", { name: /Send/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Review submitted successfully/i)).toBeInTheDocument();
    });
  });
});
