export const suppliers = [
  {
    distName: "4M Farms Ltd",
    supVid: "20200522738"
  },
  {
    distName: "Moondance Organics",
    supVid: "20200528762"
  }
];

export const getSupVid = distName => {
  let sup = suppliers.find(sup => sup.distName === distName);

  if (sup) return sup.supVid;
  else return null;
};
