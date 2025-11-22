import { renderHook } from "@testing-library/react";
import { useStretchableContainer } from "./useStretchableContainer";
import {
  ContainerStretchContext,
  type ContainerStretchContextType,
} from "@/contexts/ContainerStretchContext";
import React from "react";

describe("useStretchableContainer", () => {
  it("throws error when used outside ContainerStretchContext provider", () => {
    const renderFn = renderHook.bind(null, () => useStretchableContainer());
    expect(renderFn).toThrowError(
      "useStretchableContainer must be used within a StretchableContainer, which provides context.",
    );
  });

  it("returns context value when used within ContainerStretchContext provider", () => {
    const mockValue = {} as ContainerStretchContextType;
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ContainerStretchContext.Provider value={mockValue}>
        {children}
      </ContainerStretchContext.Provider>
    );
    const { result } = renderHook(() => useStretchableContainer(), { wrapper });
    expect(result.current).toBe(mockValue);
  });
});
