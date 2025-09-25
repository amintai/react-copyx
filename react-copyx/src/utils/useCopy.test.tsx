import { renderHook, act } from "@testing-library/react";
import { useCopy } from "../useCopy";

describe("useCopy", () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn().mockResolvedValue(undefined),
      },
    });
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("sets copied=true after copying", async () => {
    const { result } = renderHook(() => useCopy());

    await act(async () => {
      await result.current.copy("test text");
    });

    expect(result.current.isCopying).toBe(true);
  });

  it("resets copied=false after timeout", async () => {
    const { result } = renderHook(() => useCopy());

    await act(async () => {
      await result.current.copy("test text");
    });

    expect(result.current.isCopying).toBe(true);

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(result.current.isCopying).toBe(false);
  });
});
