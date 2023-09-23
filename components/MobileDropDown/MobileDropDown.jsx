import { useEffect, useRef, useState } from "react";
import "./MobileDropDown.css";
import axios from "axios";
import Link from "next/link";
import domain from "@/domain";

const MobileDropDown = ({ mobiledropclass }) => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const reference = useRef(null);

  useEffect(() => {
    axios
      .get(`${domain}/api/v1/categories/menu`)
      .then(function (response) {
        // handle success
        setCategories(response.data.data);
        const data = response.data.data;
        const subcategory = data.map((item) => item.childCategory || []);
        setSubCategories(subcategory);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  const toggleCategory = (category) => {
    if (activeCategory === category) {
      setActiveCategory(null);
    } else {
      setActiveCategory(category);
    }
  };

  return (
    <div className={mobiledropclass}>
      <ul>
        {categories.map((item) =>
          item.childCategory ? (
            <li key={item.id}>
              <p
                className="mobile-drop-down-title"
                onClick={() => toggleCategory(item)}
              >
                {item.title}
              </p>
              {activeCategory === item && (
                <div className="drop-down-item" id={item.slug}>
                  {item.childCategory.map((itemy) =>
                    itemy.childCategory ? (
                      <div key={itemy.id}>
                        <p className="drop-down-item-title">{itemy.title}</p>
                        {itemy.childCategory.map((itemyy) => (
                          <Link
                            key={itemyy.id}
                            href={`/Blog/${itemyy.slug}`}
                          >
                            <p className="drop-down-item-item">
                              {itemyy.title}
                            </p>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <Link key={itemy.id} href={`/Blog/${itemy.slug}`}>
                        <p className="drop-down-item-title">{itemy.title}</p>
                      </Link>
                    )
                  )}
                </div>
              )}
            </li>
          ) : (
            <li key={item.id}>
              <Link href={`/Blog/${item.slug}`}>{item.title}</Link>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default MobileDropDown;