<form >


    <div className="flex gap-2">
        <div >
            <div className="mb-4">
                <label className="block text-gray-700 mb-1">Patient ID:</label>
                <input
                  type="text"
                  value={selectedUser.id}
                  readOnly
                  className="w-full border-gray-300 rounded py-2 px-3"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Diet Type:</label>
                <input
                  type="text"
                  placeholder="Enter diet type"
                  className="w-full border-gray-300 rounded py-2 px-3"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Goal:</label>
                <input
                  type="text"
                  placeholder="Enter goal"
                  className="w-full border-gray-300 rounded py-2 px-3"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Calories:</label>
                <input
                  type="text"
                  placeholder="Enter calories"
                  className="w-full border-gray-300 rounded py-2 px-3"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Carbohydrates:</label>
                <input
                  type="text"
                  placeholder="Enter carbohydrates"
                  className="w-full border-gray-300 rounded py-2 px-3"
                />
              </div>
        </div>
        <div>
            <div>
                <h3 className="text-lg font-semibold mb-2">Breakfast</h3>
                <p className="text-sm text-gray-600">{dietPlan.breakfast.time}</p>
                <ul className="list-disc pl-5">
                  {dietPlan.breakfast.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                <p className="text-sm text-gray-600">Calories: {dietPlan.breakfast.calories}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mt-4 mb-2">Lunch</h3>
                <p className="text-sm text-gray-600">{dietPlan.lunch.time}</p>
                <ul className="list-disc pl-5">
                  {dietPlan.lunch.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                <p className="text-sm text-gray-600">Calories: {dietPlan.lunch.calories}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mt-4 mb-2">Dinner</h3>
                <p className="text-sm text-gray-600">{dietPlan.dinner.time}</p>
                <ul className="list-disc pl-5">
                  {dietPlan.dinner.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                <p className="text-sm text-gray-600">Calories: {dietPlan.dinner.calories}</p>
              </div>
            
        </div>
    </div>
    <div className="bg-white flex gap-5 justify-center">

                <button
                  className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                  onClick={closeModal}
                >
                  Close
                </button>

                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                >
                  Submit
                </button>

    </div>


</form>