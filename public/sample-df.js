const dfd = require("danfojs-node")


dfd.read_csv("returns.csv")
  .then(df => {
    //prints the first five columns
    df.head().print()

    //Calculate descriptive statistics for all numerical columns
    df.describe().print()

    //prints the shape of the data
    console.log(df.shape);

    //prints all column names
    console.log(df.column_names);

    //prints the inferred dtypes of each column
    df.ctypes.print()

    // //selecting a column by subsetting
    // df['Name'].print()
    //
    // //drop columns by names
    // cols_2_remove = ['Age', 'Pclass']
    // df_drop = df.drop({ columns: cols_2_remove, axis: 1 })
    // df_drop.print()
    //
    //
    // //select columns by dtypes
    // let str_cols = df_drop.select_dtypes(["string"])
    // let num_cols = df_drop.select_dtypes(["int32", "float32"])
    // str_cols.print()
    // num_cols.print()
    //
    //
    // //add new column to Dataframe
    // let new_vals = df['Fare'].round().values
    // df_drop.addColumn({ column: "fare_round", value:  new_vals})
    // df_drop.print()
    //
    // df_drop['fare_round'].print(5)
    //
    // //prints the number of occurence each value in the column
    // df_drop['Survived'].value_counts().print()
    //
    // //print the last ten elementa of a DataFrame
    // df_drop.tail(10).print()
    //
    // //prints the number of missing values in a DataFrame
    // df_drop.isna().sum().print()

  }).catch(err => {
    console.log(err);
  })