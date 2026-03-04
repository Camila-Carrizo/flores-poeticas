import { useState, useEffect, useCallback } from 'react';
import { Row, Col, Spin, Alert, Empty, Modal, message, Button, Input, Select, Space } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { flowerService } from '../services/flowerService';
import { colorService } from '../services/colorService';
import FlowerCard from '../components/FlowerCard';
import FlowerForm from '../components/FlowerForm';

export default function Home() {
  const [flowers, setFlowers] = useState([]);
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterName, setFilterName] = useState('');
  const [filterColorId, setFilterColorId] = useState(undefined);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [selectedFlower, setSelectedFlower] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [detailFlower, setDetailFlower] = useState(null);

  const loadFlowers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await flowerService.getFlowers();
      setFlowers(data);
    } catch (err) {
      setError(
        err.response?.data?.error ||
          'No se pudieron cargar las flores. Revisá que el backend esté en marcha.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const loadColors = useCallback(async () => {
    try {
      const { data } = await colorService.getColors();
      setColors(data);
    } catch {
      setColors([]);
    }
  }, []);

  useEffect(() => {
    loadFlowers();
  }, [loadFlowers]);

  useEffect(() => {
    loadColors();
  }, [loadColors]);

  const openCreateModal = () => {
    setModalMode('create');
    setSelectedFlower(null);
    setModalOpen(true);
  };

  const openEditModal = (flower) => {
    setModalMode('edit');
    setSelectedFlower(flower);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedFlower(null);
    setSubmitLoading(false);
  };

  const openDetailModal = (flower) => {
    setDetailFlower(flower);
    setDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setDetailModalOpen(false);
    setDetailFlower(null);
  };

  const handleFormSubmit = async (values) => {
    setSubmitLoading(true);
    try {
      if (modalMode === 'create') {
        await flowerService.createFlower(values);
        message.success('Flor agregada al herbario');
      } else {
        await flowerService.updateFlower(selectedFlower._id, values);
        message.success('Flor actualizada');
      }
      closeModal();
      loadFlowers();
    } catch (err) {
      message.error(err.response?.data?.error || 'Error al guardar');
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async (flower) => {
    try {
      await flowerService.deleteFlower(flower._id);
      message.success('Flor eliminada del herbario');
      loadFlowers();
    } catch (err) {
      message.error(err.response?.data?.error || 'Error al eliminar');
    }
  };

  if (loading) {
    return (
      <div className="home-loading">
        <Spin size="large" />
        <p style={{ marginTop: 16, color: 'var(--color-text-secondary)' }}>
          Cargando herbario…
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <>
        <h1 className="herbario-title" style={{ marginBottom: 24 }}>
          Herbario poético
        </h1>
        <Alert
          type="error"
          showIcon
          message="Error al cargar"
          description={error}
          action={
            <Button size="small" onClick={loadFlowers}>
              Reintentar
            </Button>
          }
        />
      </>
    );
  }

  const formInitialValues =
    modalMode === 'edit' && selectedFlower
      ? {
          name: selectedFlower.name,
          image: selectedFlower.image,
          poeticMeaning: selectedFlower.poeticMeaning,
          color: selectedFlower.color?._id ?? undefined,
        }
      : { name: '', image: '', poeticMeaning: '', color: undefined };

  const filteredFlowers = flowers.filter((f) => {
    const matchName = !filterName || f.name.toLowerCase().includes(filterName.trim().toLowerCase());
    const matchColor =
      filterColorId == null
        ? true
        : filterColorId === '__sin_color__'
          ? !f.color
          : f.color?._id === filterColorId;
    return matchName && matchColor;
  });

  return (
    <>
      <h1 className="herbario-title" style={{ marginBottom: 24 }}>
        Herbario poético
      </h1>

      <Space direction="vertical" size="middle" style={{ width: '100%', marginBottom: 24 }}>
        <Space wrap size="middle">
          <Input
            placeholder="Buscar por nombre de flor"
            prefix={<SearchOutlined style={{ color: 'var(--color-text-secondary)' }} />}
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
            allowClear
            style={{ width: 220 }}
          />
          <Select
            placeholder="Filtrar por color"
            allowClear
            value={filterColorId}
            onChange={setFilterColorId}
            options={[
              { value: '__sin_color__', label: 'Sin color' },
              ...colors.map((c) => ({ value: c._id, label: c.name })),
            ]}
            style={{ width: 180 }}
          />
        </Space>
      </Space>

      <Row gutter={[24, 24]} className="flower-grid">
        <Col xs={24} sm={12} md={8} lg={6}>
          <button
            type="button"
            className="add-flower-card"
            onClick={openCreateModal}
            aria-label="Agregar nueva flor"
          >
            <span className="add-flower-card__icon">
              <PlusOutlined />
            </span>
            <span className="add-flower-card__label">Agregar nueva flor</span>
            <span className="add-flower-card__hint">Sumá una flor al herbario</span>
          </button>
        </Col>
        {filteredFlowers.map((flower) => (
          <Col xs={24} sm={12} md={8} lg={6} key={flower._id}>
            <FlowerCard
              flower={flower}
              mode="manage"
              onEdit={openEditModal}
              onDelete={handleDelete}
              onPreview={openDetailModal}
            />
          </Col>
        ))}
      </Row>

      {filteredFlowers.length === 0 && (
        <Empty
          description={flowers.length === 0 ? 'Aún no hay flores. Usá la tarjeta de arriba para agregar la primera.' : 'Ninguna flor coincide con el filtro.'}
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          style={{ marginTop: 48 }}
        />
      )}

      <Modal
        title={modalMode === 'create' ? 'Nueva flor' : 'Editar flor'}
        open={modalOpen}
        onCancel={closeModal}
        footer={null}
        destroyOnClose
        width={480}
        className="flower-form-modal"
        styles={{ body: { paddingTop: 8 } }}
      >
        <FlowerForm
          initialValues={formInitialValues}
          onSubmit={handleFormSubmit}
          onCancel={closeModal}
          loading={submitLoading}
        />
      </Modal>

      <Modal
        title={detailFlower?.name}
        open={detailModalOpen}
        onCancel={closeDetailModal}
        footer={
          <Button type="primary" onClick={closeDetailModal}>
            Cerrar
          </Button>
        }
        width={560}
        className="flower-detail-modal"
        styles={{ body: { paddingTop: 16 } }}
      >
        {detailFlower && (
          <div className="flower-detail-modal-content">
            <div className="flower-detail-modal-image">
              <img
                src={detailFlower.image || 'https://placehold.co/560x320?text=Flor'}
                alt={detailFlower.name}
                onError={(e) => { e.target.src = 'https://placehold.co/560x320?text=Sin+imagen'; }}
              />
            </div>
            <p className="flower-detail-modal-meaning">{detailFlower.poeticMeaning}</p>
          </div>
        )}
      </Modal>
    </>
  );
}
