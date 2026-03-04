import { useState, useEffect, useCallback } from 'react';
import { Card, Form, Input, Button, List, Space, Modal, message, Popconfirm } from 'antd';
import { PaletteOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { colorService } from '../services/colorService';

export default function ColorsPage() {
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingColor, setEditingColor] = useState(null);
  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);

  const loadColors = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await colorService.getColors();
      setColors(data);
    } catch (err) {
      setError(err.response?.data?.error || 'No se pudieron cargar los colores.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadColors();
  }, [loadColors]);

  const openCreate = () => {
    setEditingColor(null);
    form.setFieldsValue({ name: '', hex: '#ffffff' });
    setModalOpen(true);
  };

  const openEdit = (color) => {
    setEditingColor(color);
    form.setFieldsValue({ name: color.name, hex: color.hex });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingColor(null);
    form.resetFields();
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setSubmitLoading(true);
      if (editingColor) {
        await colorService.updateColor(editingColor._id, values);
        message.success('Color actualizado');
      } else {
        await colorService.createColor(values);
        message.success('Color creado');
      }
      closeModal();
      loadColors();
    } catch (err) {
      if (err.errorFields) return;
      message.error(err.response?.data?.error || 'Error al guardar');
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async (color) => {
    try {
      await colorService.deleteColor(color._id);
      message.success('Color eliminado');
      loadColors();
    } catch (err) {
      message.error(err.response?.data?.error || 'Error al eliminar');
    }
  };

  if (loading) {
    return (
      <div className="home-loading">
        <p style={{ color: 'var(--color-text-secondary)' }}>Cargando colores…</p>
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <p style={{ color: 'var(--color-error, #b85450)' }}>{error}</p>
        <Button onClick={loadColors}>Reintentar</Button>
      </Card>
    );
  }

  return (
    <>
      <h1 className="herbario-title" style={{ marginBottom: 24 }}>
        Colores
      </h1>
      <Card className="colors-form-card" style={{ marginBottom: 24 }}>
        <Button type="primary" icon={<PaletteOutlined />} onClick={openCreate}>
          Agregar color
        </Button>
      </Card>
      <Card title="Lista de colores">
        <List
          loading={loading}
          dataSource={colors}
          locale={{ emptyText: 'Aún no hay colores. Agregá uno arriba.' }}
          renderItem={(color) => (
            <List.Item
              actions={[
                <Button type="text" icon={<EditOutlined />} onClick={() => openEdit(color)} title="Editar" />,
                <Popconfirm
                  key="del"
                  title="¿Eliminar este color?"
                  description="Las flores que lo usen quedarán sin color."
                  onConfirm={() => handleDelete(color)}
                  okText="Sí"
                  cancelText="No"
                  okButtonProps={{ danger: true }}
                >
                  <Button type="text" danger icon={<DeleteOutlined />} title="Eliminar" />
                </Popconfirm>,
              ]}
            >
              <List.Item.Meta
                avatar={<div style={{ width: 24, height: 24, borderRadius: 4, backgroundColor: color.hex }} />}
                title={color.name}
                description={color.hex}
              />
            </List.Item>
          )}
        />
      </Card>
      <Modal
        title={editingColor ? 'Editar color' : 'Nuevo color'}
        open={modalOpen}
        onOk={handleSubmit}
        onCancel={closeModal}
        confirmLoading={submitLoading}
        okText="Guardar"
        destroyOnClose
      >
        <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item name="name" label="Nombre" rules={[{ required: true, message: 'Ingresá el nombre' }]}>
            <Input placeholder="Ej: Rojo, Verde" />
          </Form.Item>
          <Form.Item name="hex" label="Color (hex)" rules={[{ required: true }]}>
            <input type="color" style={{ width: '100%', height: 40, padding: 4, border: '1px solid #d9d9d9', borderRadius: 8 }} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
