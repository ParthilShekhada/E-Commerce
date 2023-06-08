import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 d-flex justify-content-left">
        <div className="input-group w-auto">
          <input
            type="text"
            className="form-control "
            placeholder="Enter new category"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary ">
          Submit
        </button>
        </div>

        
      </form>
    </>
  );
};

export default CategoryForm;