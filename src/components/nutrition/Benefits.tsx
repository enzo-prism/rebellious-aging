
import React from 'react';

const Benefits = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Benefits of Whole-Food, Plant-Based Nutrition</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-bold mb-3">Heart Health</h3>
          <p className="text-gray-700">
            Studies show WFPB diets can prevent and even reverse coronary artery disease by reducing cholesterol, blood pressure, and inflammation while improving blood vessel function.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-bold mb-3">Diabetes Management</h3>
          <p className="text-gray-700">
            A WFPB diet improves insulin sensitivity, lowers blood sugar levels, and can reduce or eliminate the need for diabetes medication in many people with type 2 diabetes.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-bold mb-3">Weight Management</h3>
          <p className="text-gray-700">
            High in fiber and naturally lower in calories, WFPB eating supports healthy weight loss and maintenance without calorie counting or portion control.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-bold mb-3">Cancer Prevention</h3>
          <p className="text-gray-700 mb-3">
            Plant foods are rich in antioxidants and phytonutrients that help protect cells from damage that can lead to cancer. Animal products and processed meats are linked to cancer risk.
          </p>
          <p className="text-gray-700 mb-3">
            <strong>Antioxidants</strong> are natural substances that help protect your body's cells from damage. They work by stopping harmful molecules called free radicals, which can hurt cells and contribute to aging and diseases like cancer or heart disease. You can think of antioxidants as your body's tiny defenders - tiny shields that block damage.
          </p>
          <p className="text-gray-700">
            <strong>Phytonutrients</strong> are natural chemicals found in plants that keep plants healthy and can help to keep you healthy also. They support your body by protecting against disease, reducing inflammation and helping your cells to work better. You can think of phytonutrients as the bonus superpowers in fruits, veggies, whole grains, and herbs. They give your body extra protection and strength.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-bold mb-3">Cognitive Function</h3>
          <p className="text-gray-700">
            The antioxidants, healthy fats, and nutrients in plant foods support brain health and may help reduce the risk of cognitive decline and dementia.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-bold mb-3">Gut Health</h3>
          <p className="text-gray-700">
            High-fiber plant foods promote a healthy microbiome, supporting your immune system, hormone balance, and mental health through the gut-brain connection.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Benefits;
