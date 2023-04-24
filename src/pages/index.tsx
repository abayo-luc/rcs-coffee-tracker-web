import { Layout } from '@/components/Layout';
import { axiosClient } from '@/config/reactQuery';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useQuery } from 'react-query';

interface DataType {
  id: string;
  shipmentId: string;
  origin: string;
  destination: string;
  quantity: number;
  status?: string;
  createdAt: Date;
  updatedAt: Date;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Shipment ID',
    dataIndex: 'shipmentId',
    key: 'shipmentId',
  },
  {
    title: 'Origin',
    dataIndex: 'origin',
    key: 'origin',
  },
  {
    title: 'Destination',
    dataIndex: 'destination',
    key: 'destination',
  },
  {
    title: 'Quantity',
    key: 'quantity',
    dataIndex: 'quantity',
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    render: (_, { status }: any) => (
      <Tag color='geekblue'>{status?.toUpperCase()}</Tag>
    ),
  },
  {
    title: 'Date',
    key: 'createdAt',
    dataIndex: 'createdAt',
    render: (_, { createdAt }: DataType) => {
      return new Date(createdAt).toLocaleDateString();
    },
  },
];

const Home = () => {
  const {
    error,
    data = {},
    isLoading,
  } = useQuery('ALL_SHIPMENTS', () =>
    axiosClient.get('/shipments')
  );
  const { rows = [], count } = data as {
    rows: DataType[];
    count: number;
  };
  return (
    <Layout>
      <Table
        columns={columns}
        dataSource={rows}
        loading={isLoading}
        pagination={{
          hideOnSinglePage: true,
          total: count,
        }}
      />
    </Layout>
  );
};

export default Home;
