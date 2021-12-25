class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  search() {
    const keyword = this.queryStr.keyword
      ? {
          // ca for exemple
          name: {
            $regex: this.queryStr.keyword,
            $options: "i", // najmou na7aha
          },
        }
      : {};
    console.log(keyword);
    this.query = this.query.find({ ...keyword });
    return this;
  }
  filter() {
    const queryCopy = { ...this.queryStr };
    console.log(queryCopy);
    // removing fields from the query
    const removingFields = ["keyword", "limit", "page"];
    removingFields.forEach((el) => delete queryCopy[el]);
    console.log(queryCopy);
    // advance filter with price and rating ect :
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
    console.log("queryStr", queryStr);
    console.log(queryCopy);
    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }
  pagination(resPerPage) {
    const currentPage = Number(this.queryStr.page) || 1; // ken mawjoud choufli qadeh sinon par défaut 1
    const skip = resPerPage * (currentPage - 1); // si je prends l'exemple ene f page 2 => on doit passer 4*(2-1) match donc 4
    this.query = this.query.limit(resPerPage).skip(skip);
    return this;
  }
}
module.exports = ApiFeatures;
