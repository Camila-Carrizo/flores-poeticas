import { useEffect, useState } from 'react';
import { Form, Input, Button, Space, Upload, Select, message } from 'antd';
import { PlusOutlined, LoadingOutlined, DeleteOutlined } from '@ant-design/icons';
import { uploadImageFile } from '../services/uploadService';
import { colorService } from '../services/colorService';

const { TextArea } = Input;

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const ACCEPT_IMAGES = 'image/jpeg,image/png,image/gif,image/webp';
const MAX_SIZE_MB = 5;

export default function FlowerForm({ initialValues, onSubmit, onCancel, loading }) {
  const [form] = Form.useForm();
  const [uploadLoading, setUploadLoading] = useState(false);
  const [colors, setColors] = useState([]);
  const imageUrl = Form.useWatch('image', form);

  useEffect(() => {
    form.setFieldsValue(initialValues || { name: '', image: '', poeticMeaning: '', color: undefined });
  }, [initialValues, form]);

  useEffect(() => {
    colorService.getColors().then(({ data }) => setColors(data)).catch(() => setColors([]));
  }, []);

  const handleFinish = (values) => {
    const payload = { ...values };
    if (payload.color === undefined || payload.color === '') payload.color = null;
    onSubmit(payload);
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  const handleUpload = async (file) => {
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      message.error('La imagen no puede superar 5 MB.');
      return;
    }
    setUploadLoading(true);
    try {
      const url = await uploadImageFile(file);
      form.setFieldValue('image', url);
      message.success('Imagen subida');
    } catch (err) {
      message.error(err.response?.data?.error || 'Error al subir la imagen.');
    } finally {
      setUploadLoading(false);
    }
  };

  const removeImage = () => {
    form.setFieldValue('image', '');
  };

  return (
    <Form
      form={form}
      {...layout}
      initialValues={initialValues}
      onFinish={handleFinish}
      layout="vertical"
      requiredMark={false}
    >
      <Form.Item
        name="name"
        label="Nombre"
        rules={[{ required: true, message: 'Ingresá el nombre de la flor' }]}
      >
        <Input placeholder="Ej: Rosa, Girasol…" size="large" />
      </Form.Item>

      <Form.Item label="Imagen (opcional)">
        <Form.Item name="image" noStyle>
          <input type="hidden" />
        </Form.Item>
        {imageUrl ? (
        <div className="flower-form-preview-wrap">
          <div className="flower-form-preview">
            <img src={imageUrl} alt="Vista previa" />
          </div>
          <Space size="middle" style={{ marginTop: 12 }}>
            <Upload
              accept={ACCEPT_IMAGES}
              showUploadList={false}
              beforeUpload={(file) => {
                handleUpload(file);
                return false;
              }}
              disabled={uploadLoading}
            >
              <Button type="default" icon={uploadLoading ? <LoadingOutlined /> : <PlusOutlined />} loading={uploadLoading}>
                Cambiar imagen
              </Button>
            </Upload>
            <Button type="text" danger icon={<DeleteOutlined />} onClick={removeImage} disabled={uploadLoading}>
              Quitar
            </Button>
          </Space>
        </div>
      ) : (
        <Upload.Dragger
          accept={ACCEPT_IMAGES}
          showUploadList={false}
          beforeUpload={(file) => {
            handleUpload(file);
            return false;
          }}
          disabled={uploadLoading}
          className="flower-form-upload"
        >
          <p className="ant-upload-drag-icon">
            {uploadLoading ? <LoadingOutlined style={{ fontSize: 40 }} /> : <PlusOutlined style={{ fontSize: 40 }} />}
          </p>
          <p className="ant-upload-text">
            {uploadLoading ? 'Subiendo…' : 'Hacé clic o arrastrá una imagen aquí'}
          </p>
          <p className="ant-upload-hint">JPEG, PNG, GIF o WebP. Máximo 5 MB.</p>
        </Upload.Dragger>
        )}
      </Form.Item>

      <Form.Item
        name="poeticMeaning"
        label="Significado poético"
        rules={[{ required: true, message: 'Ingresá el significado poético' }]}
      >
        <TextArea
          rows={4}
          placeholder="Un breve texto poético sobre la flor…"
          showCount
          maxLength={500}
        />
      </Form.Item>
      <Form.Item name="color" label="Color (opcional)">
        <Select
          placeholder="Ninguno"
          allowClear
          options={colors.map((c) => ({ value: c._id, label: c.name }))}
        />
      </Form.Item>
      <Form.Item wrapperCol={{ span: 24 }} style={{ marginBottom: 0, marginTop: 24 }}>
        <Space size="middle" style={{ width: '100%', justifyContent: 'flex-end' }}>
          <Button onClick={handleCancel} disabled={loading}>
            Cancelar
          </Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            {initialValues?.name ? 'Guardar cambios' : 'Crear flor'}
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
}
