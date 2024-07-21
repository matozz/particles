import type { Track } from "@/controller/stores/playlist/types";

export const Hero: Track = {
  name: "Hero",
  tempo: 128,
  patterns: {
    sequences: [
      {
        start: 1,
        duration: 12,
        settings: {
          sequence: { type: "step_multi" },
          color: { mode: "static", data: [["#ff0000"], ["#ff691c"]] },
          repeat: 1,
        },
      },
      {
        start: 16,
        duration: 12,
        settings: {
          sequence: { type: "step_multi" },
          color: { mode: "static", data: [["#ff0000"], ["#ff691c"]] },
          repeat: 2,
        },
      },
      {
        start: 24,
        duration: 12,
        settings: {
          sequence: { type: "step_multi" },
          color: { mode: "static", data: [["#ff0000"], ["#ff691c"]] },
          repeat: 4,
        },
      },
      {
        start: 28,
        duration: 12,
        settings: {
          sequence: { type: "flow_triplet" },
          color: { mode: "static", data: [["#ff0000"]] },
          repeat: 1,
        },
      },
      {
        start: 30,
        duration: 12,
        settings: {
          sequence: { type: "flow_double" },
          color: { mode: "static", data: [["#ff691c"]] },
          repeat: 1,
        },
      },
      {
        start: 31,
        duration: 12,
        settings: {
          sequence: { type: "flow_double" },
          color: { mode: "static", data: [["#ff0000"]] },
          repeat: 1,
        },
      },
      {
        start: 32,
        duration: 12,
        settings: {
          sequence: { type: "zoom_out" },
          color: { mode: "static", data: [["#ff0000"]] },
          repeat: 1,
        },
      },
      {
        start: 33,
        duration: 12,
        settings: {
          sequence: { type: "flash" },
          color: { mode: "static", data: [["#ff0000"]] },
          repeat: 4,
        },
      },
      {
        start: 34,
        duration: 12,
        settings: {
          sequence: { type: "zoom_in" },
          color: { mode: "static", data: [["#ff691c"]] },
          repeat: 1,
        },
      },
      {
        start: 35,
        duration: 12,
        settings: {
          sequence: { type: "step_multi" },
          color: { mode: "static", data: [["#ff0000"], ["#ff691c"]] },
          repeat: 4,
        },
      },
      {
        start: 36,
        duration: 12,
        settings: {
          sequence: { type: "zoom_out" },
          color: { mode: "static", data: [["#ff0000"]] },
          repeat: 1,
        },
      },
      {
        start: 37,
        duration: 12,
        settings: {
          sequence: { type: "flash" },
          color: { mode: "static", data: [["#ff0000"]] },
          repeat: 4,
        },
      },
      {
        start: 38,
        duration: 12,
        settings: {
          sequence: { type: "zoom_in" },
          color: { mode: "static", data: [["#ff691c"]] },
          repeat: 1,
        },
      },
      {
        start: 39,
        duration: 12,
        settings: {
          sequence: { type: "step_multi" },
          color: { mode: "static", data: [["#ff0000"], ["#ff691c"]] },
          repeat: 4,
        },
      },
      {
        start: 40,
        duration: 12,
        settings: {
          sequence: { type: "zoom_out_step_bottom_left" },
          color: { mode: "static", data: [["#ff691c"]] },
          repeat: 1,
        },
      },
      {
        start: 48,
        duration: 12,
        settings: {
          sequence: { type: "zoom_out" },
          color: { mode: "static", data: [["#ff0000"]] },
          repeat: 1,
        },
      },
      {
        start: 49,
        duration: 12,
        settings: {
          sequence: { type: "flash" },
          color: { mode: "static", data: [["#ff0000"]] },
          repeat: 4,
        },
      },
      {
        start: 50,
        duration: 12,
        settings: {
          sequence: { type: "zoom_in" },
          color: { mode: "static", data: [["#ff0000"]] },
          repeat: 1,
        },
      },
      {
        start: 51,
        duration: 12,
        settings: {
          sequence: { type: "step_multi" },
          color: { mode: "static", data: [["#ff0000"], ["#ff691c"]] },
          repeat: 4,
        },
      },
      {
        start: 52,
        duration: 12,
        settings: {
          sequence: { type: "zoom_out" },
          color: { mode: "static", data: [["#ff691c"]] },
          repeat: 1,
        },
      },
      {
        start: 53,
        duration: 12,
        settings: {
          sequence: { type: "flash" },
          color: { mode: "static", data: [["#ff0000"]] },
          repeat: 4,
        },
      },
      {
        start: 54,
        duration: 12,
        settings: {
          sequence: { type: "zoom_in" },
          color: { mode: "static", data: [["#ff0000"]] },
          repeat: 1,
        },
      },
      {
        start: 55,
        duration: 12,
        settings: {
          sequence: { type: "step_multi" },
          color: { mode: "static", data: [["#ff0000"], ["#ff691c"]] },
          repeat: 4,
        },
      },
      {
        start: 56,
        duration: 12,
        settings: {
          sequence: { type: "zoom_out_step_bottom_left" },
          color: { mode: "static", data: [["#ff691c"]] },
          repeat: 1,
        },
      },
      {
        start: 60,
        duration: 12,
        settings: {
          sequence: { type: "flow_quadruple" },
          color: { mode: "static", data: [["#ffffff"]] },
          repeat: 1,
        },
      },
      {
        start: 62,
        duration: 12,
        settings: {
          sequence: { type: "flow_triplet" },
          color: { mode: "static", data: [["#ffffff"]] },
          repeat: 1,
        },
      },
      // END
      {
        start: 64,
        duration: 12,
        settings: {
          sequence: { type: "flow_step_y_multi" },
          color: { mode: "static", data: [["#ff0000"]] },
          repeat: 1,
        },
      },
    ],
  },
};
