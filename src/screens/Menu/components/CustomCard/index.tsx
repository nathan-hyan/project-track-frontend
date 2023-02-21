import { useState } from 'react';
import { Card, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Variants } from 'constants/bootstrapVariants';

interface Props {
    icon: IconProp;
    name: string;
    path: string;
}

function CustomCard({ icon, name, path }: Props) {
  const [isHovering, setIsHovering] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(path);
  };

  const handleOnHover = () => {
    setIsHovering((prevState) => !prevState);
  };

  return (
    <Col>
      <Card
        className="text-center"
        style={{
          width: '10rem', minHeight: '10rem', transition: '0.1s', cursor: 'pointer',
        }}
        onClick={handleNavigate}
        onMouseEnter={handleOnHover}
        onMouseLeave={handleOnHover}
        bg={isHovering ? Variants.Primary : Variants.Light}
        text={isHovering ? 'white' : 'dark'}
      >
        <Card.Body>
          <Card.Title className="mb-4">
            <FontAwesomeIcon icon={icon} size="3x" />
          </Card.Title>
          <Card.Subtitle>
            <p className="p-0 m-0">{name}</p>
          </Card.Subtitle>
        </Card.Body>
      </Card>
    </Col>
  );
}
export default CustomCard;
