import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Spin, Alert } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { flowerService } from '../services/flowerService';

export default function FlowerDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [flower, setFlower] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadFlower();
  }, [id]);

  const loadFlower = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await flowerService.getFlowerById(id);
      setFlower(data);
    } catch (err) {
      setError(err.response?.status === 404 ? 'Flor no encontrada' : 'Error al cargar la flor');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="home-loading">
        <Spin size="large" />
      </div>
    );
  }

  if (error || !flower) {
    return (
      <>
        <Alert type="error" showIcon message={error || 'Flor no encontrada'} />
        <Button type="primary" ghost icon={<ArrowLeftOutlined />} onClick={() => navigate('/')} style={{ marginTop: 16 }}>
          Volver al herbario
        </Button>
      </>
    );
  }

  const imageUrl = flower.image || null;
  const fallbackUrl = 'https://placehold.co/800x400?text=Sin+imagen';
  const bodyBg = flower.color?.hex || '#ffffff';

  return (
    <>
      <Button
        type="text"
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate('/')}
        style={{ marginBottom: 24, color: 'var(--color-forest)' }}
      >
        Volver al herbario
      </Button>
      <Card
        className="flower-detail-card"
        cover={
          imageUrl ? (
            <img
              alt={flower.name}
              src={imageUrl}
              onError={(e) => { e.target.src = fallbackUrl; }}
              style={{ maxHeight: 400, objectFit: 'cover' }}
            />
          ) : null
        }
      >
        <div style={{ backgroundColor: bodyBg, margin: -24, padding: 24, borderRadius: '0 0 20px 20px' }}>
          <h1 className="herbario-title" style={{ marginBottom: 16 }}>{flower.name}</h1>
          <p className="flower-detail-meaning">{flower.poeticMeaning}</p>
        </div>
      </Card>
    </>
  );
}
