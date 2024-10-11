import React from "react";

export default function JobRow() {
    return (
      <>
        <div className="bg-white p-4 rounded-lg shadow-sm flex gap-4">
          <div className="content-center">
            <img
              className="size-12"
              src="data:image/png;base64,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"
            />
          </div>
          <div className="grow">
            <div>Amazon</div>
            <div>Product designer</div>
            <div>Remote &middot; New York, US | Full-time</div>
          </div>
          <div className="content-end text-gray-500 text-sm">
            2 weeks ago
          </div>
        </div>
      </>
    );
}