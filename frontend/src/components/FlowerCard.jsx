import { Card, Button, Space, Popconfirm } from 'antd';
import { ReadOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Meta from 'antd/es/card/Meta';

const POETIC_PREVIEW_LENGTH = 120;

function truncateText(text, maxLength) {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '…';
}

export default function FlowerCard({ flower, mode = 'read', onEdit, onDelete, onPreview }) {
  const briefMeaning = truncateText(flower.poeticMeaning, POETIC_PREVIEW_LENGTH);
  const imageUrl = flower.image || null;
  const fallbackUrl = 'https://placehold.co/400x240?text=Sin+imagen';
  const bodyBg = flower.color?.hex || '#ffffff';

  const isManage = mode === 'manage';

  const handleCardClick = (e) => {
    if (onPreview && !e.target.closest('button') && !e.target.closest('.flower-card-actions-bottom-left')) {
      onPreview(flower);
    }
  };

  const actions = !isManage
    ? [
        <Link to={`/flor/${flower._id}`} key="read-more">
          <Button type="primary" ghost icon={<ReadOutlined />} block>
            Leer más
          </Button>
        </Link>,
      ]
    : undefined;

  return (
    <Card
      className={`flower-card ${isManage ? 'flower-card--manage' : ''} ${onPreview ? 'flower-card--clickable' : ''}`}
      hoverable
      onClick={onPreview ? handleCardClick : undefined}
      cover={
        imageUrl ? (
          <img
            alt={flower.name}
            src={imageUrl}
            onError={(e) => {
              e.target.src = fallbackUrl;
            }}
          />
        ) : null
      }
      actions={actions}
    >
      <div className="flower-card-body-wrap" style={{ backgroundColor: bodyBg }}>
        <Meta title={flower.name} />
        <p className="flower-card-poetic-preview">{briefMeaning}</p>
        {isManage && (
          <div className="flower-card-actions-bottom-left" onClick={(e) => e.stopPropagation()}>
            <Button
              type="text"
              size="small"
              icon={<EditOutlined />}
              onClick={() => onEdit?.(flower)}
              className="flower-card-btn-icon"
              title="Editar"
            />
            <Popconfirm
              title="¿Eliminar esta flor?"
              description="Se quitará del herbario para siempre."
              onConfirm={() => onDelete?.(flower)}
              okText="Sí, eliminar"
              cancelText="No"
              okButtonProps={{ danger: true }}
            >
              <Button
                type="text"
                size="small"
                danger
                icon={<DeleteOutlined />}
                className="flower-card-btn-icon"
                title="Eliminar"
              />
            </Popconfirm>
          </div>
        )}
      </div>
    </Card>
  );
}
