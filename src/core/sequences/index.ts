import { ElementInfo } from "../controller";

export const SequenceList = [
  {
    type: "flow",
    data: (elementList: ElementInfo[]) => {
      const list = elementList.reduce<ElementInfo[][]>((acc, cur) => {
        const { x } = cur;
        acc[x] = [...(acc[x] || []), cur];
        return acc;
      }, []);
      return list;
    },
  },
  {
    type: "reverse_flow",
    data: (elementList: ElementInfo[]) => {
      const list = elementList.reduce<ElementInfo[][]>((acc, cur) => {
        const { x } = cur;
        acc[x] = [...(acc[x] || []), cur];
        return acc;
      }, []);

      const revList = [...list].reverse();

      list.pop();
      revList.pop();
      return [...list, ...revList];
    },
  },
];
