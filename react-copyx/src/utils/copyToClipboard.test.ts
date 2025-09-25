import { copyToClipboard } from "./copyToClipboard";

describe("copyToClipboard", () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn().mockResolvedValue(undefined),
      },
    });
  });

  it("copies text to clipboard successfully", async () => {
    await copyToClipboard("hello");
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("hello");
  });

  it("throws error if clipboard API fails", async () => {
    (navigator.clipboard.writeText as jest.Mock).mockRejectedValueOnce(
      new Error("fail")
    );

    await expect(copyToClipboard("oops")).rejects.toThrow("fail");
  });
});
