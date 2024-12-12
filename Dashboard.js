import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Slider from 'react-slick'; // Import react-slick for the slideshow
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import logo from './images/INVestIQ.png'; 
import './Dashboard.css'; 
import Navbar from "./Navbar";

const Dashboard = () => {
  const navigate = useNavigate();

  // State for search functionality
  const [searchTerm, setSearchTerm] = useState("");

  // Stock market images for the slideshow
  const stockImages = [ '/1L-transactions.png', '/1200x600-v1-2-1.png', '/icici-1200-600.png', '/1200x600-v3-1-1.png', ];

  // Companies array for display
  const companies = [
    { name: 'Apple', logo: '/apple-logo.png', url: 'https://www.apple.com/investor/', description: 'Apple Inc. is an American multinational technology company.' },
    { name: 'Google', logo: '/google-icon.png', url: 'https://www.google.com/finance/', description: 'Google LLC is an American multinational technology company specializing in Internet services.' },
    { name: 'Amazon', logo: '/amazon-logo.png', url: 'https://www.amazon.com/invest/', description: 'Amazon.com, Inc. is an American multinational technology company focusing on e-commerce.' },
    { name: 'Tesla', logo: '/tesla-logo.png', url: 'https://ir.tesla.com/#quarterly-disclosure', description: 'Tesla, Inc. is an American electric vehicle and clean energy company.' },
    { name: 'Oracle', logo: '/oracle-logo.png', url: 'https://investor.oracle.com/home/default.aspx', description: 'Oracle Corporation is an American multinational technology corporation.'  },
    { name: 'NSE', logo: '/nse-logo.png', url: 'https://www.nseindia.com/investor-relations/financials', description: 'National Stock Exchange of India is the leading stock exchange in India.'  },
    { name: 'Aditya Birla', logo: '/aditya-logo.png', url: 'https://www.adityabirlacapital.com/investor-relations', description: 'Aditya Birla Capital Limited is an Indian financial services company.'  },
    { name: 'Intuit', logo: '/intuit-logo.png', url: 'https://investors.intuit.com/', description: 'Intuit Inc. is an American business software company.' },
    { name: 'ICICI Bank', logo: '/icicibank-logo.png', url: 'https://www.icicibank.com/about-us/investor-relations', description: 'ICICI Bank Limited is an Indian multinational bank and financial services company.'  },
    { name: 'Infosys', logo: '/infosys-logo.png', url: 'https://www.infosys.com/investors.html', description: 'Infosys Limited is an Indian multinational information technology company.'  },
    { name: 'Asian Paints', logo: '/Asian-Paints-logo.png', url: 'https://www.asianpaints.com/more/investors.html', description: 'Asian Paints Limited is an Indian multinational paint company.'  },
    { name: 'Nestle', logo: '/nestle-logo.png', url: 'https://www.nestle.in/investors', description: 'Nestle S.A. is a Swiss multinational food and drink processing company.'  },
    { name: 'Tata Motors', logo: '/tata-logo.png', url: 'https://www.tatamotors.com/investors/', description: 'Tata Motors Limited is an Indian multinational automotive manufacturing company.'  },
    { name: 'Maruthi Suzuki', logo: '/maruthisuzuki-logo.png', url: 'https://www.marutisuzuki.com/corporate/investors', description: 'Maruti Suzuki India Limited is an Indian automotive manufacturer.'  },
    { name: 'Reliance', logo: '/reliance-logo.png', url: 'https://www.ril.com/investors/investor-relations', description: 'Reliance Industries Limited is an Indian multinational conglomerate.'  },
    { name: 'TradeStation', logo: '/tradestation-logo.png', url: 'https://www.tradestation.com/press-and-news/', description: 'TradeStation is a financial services company and online broker-dealer.'  },
    { name: 'ITC', logo: '/itc-logo.png', url: 'https://www.itcportal.com/investor/index.aspx', description: 'ITC Limited is an Indian multinational conglomerate company.'  },
    { name: 'NTPC', logo: '/ntpc-logo.png', url: 'https://ntpc.co.in/index.php/investors', description: 'NTPC Limited is an Indian public sector undertaking engaged in power generation.'  },
    { name: 'Kotak Mahindra Bank', logo: '/Kotak-Mahindra-Bank-logo.png', url: 'https://www.kotak.com/en/investor-relations.html' , description: 'Kotak Mahindra Bank Limited is an Indian private sector bank.' },
    { name: 'Wipro', logo: '/Wipro-logo.png', url: 'https://www.wipro.com/investors/', description: 'Wipro Limited is an Indian multinational corporation that provides IT services.'  }
  ];

  // Filtered companies based on the search term
  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Slider settings for stock market images
  const stockSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleLogout = () => {
    navigate('/'); // Redirect to the login page
  };

  const handleInvest = (companyUrl) => {
    window.open(companyUrl, '_blank'); // Open the company's stock-buying page
  };

  return (
    <div>
      {/* Watermark background */}
      <div className="dashboard-background"></div>

      {/* Navbar */}
      <Navbar handleLogout={handleLogout} />

      {/* Stock Market Image Slider */}
      <div className="container mt-4 mb-4"></div>.
      <div className="container mt-4 mb-4"></div>.
      <div className="container mt-4">
        <h3 style={{ color: 'black' }}>Stock Market Insights</h3>
        <Slider {...stockSliderSettings}>
          {stockImages.map((image, index) => (
            <div key={index}>
              <img 
                src={image} 
                alt={`Stock Market Slide ${index + 1}`} 
                style={{ width: '100%', height: '500px', objectFit: 'cover' }} 
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Search Bar */}
      <div className="container mt-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search for a company..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Company Stocks Display */}
      <div className="container mt-4">
        <h3 className="mt-5" style={{ color: 'black' }}>Company Stocks</h3>
        <div className="row">
          {filteredCompanies.map((company) => (
            <div key={company.name} className="col-md-3 mb-4">
              <div className="card company-card" onClick={() => handleInvest(company.url)}>
                <img
                  src={company.logo}
                  className="card-img-top"
                  alt={`${company.name} logo`}
                  style={{ height: '150px', objectFit: 'contain' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{company.name}</h5>
                </div>
                {/* Hoverable info */}
                <div className="company-info">{company.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
