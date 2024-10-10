import { Layout, Page, Card, Text } from '@shopify/polaris';
import LineChart from '../../components/LineChart';
import BarChart from '../../components/BarChart';
import { DatePickerFilter } from '../../components/DatepickerFilter';
import { generateFakeData } from '../../utils/dataDummy';
import { useState } from 'react';
import { SelectedDate } from '../../utils/type';
import { addDays, calculateDaysBetween } from '../../utils/helper';

export const Dashboard = () => {
  const [selected, setSelected] = useState<SelectedDate>({
    start: new Date(),
    end: addDays(new Date(), 7),
  });

  const dummyLineChart = generateFakeData(
    calculateDaysBetween(selected.start, selected.end) + 1,
    'line'
  );
  const labels = dummyLineChart.map((item) => item.label);
  const dataLineChart = dummyLineChart.map((item) => item.data);
  const dummyBarChart = generateFakeData(
    calculateDaysBetween(selected.start, selected.end) + 1,
    'bar'
  );
  const dataBarChart = dummyBarChart.map((item) => item.data);

  return (
    <Page fullWidth title="Dashboard">
      <div className="date-filter">
        <DatePickerFilter selected={selected} setSelected={setSelected} />
      </div>
      <Layout>
        <Layout.Section>
          <div className="chart-wrapper">
            <Card>
              <Text as="h4" variant="headingLg" fontWeight="bold">
                Subscription
              </Text>
              <Text as="h3" variant="headingXl" fontWeight="bold">
                {dataLineChart?.reduce((sum, num) => sum + num, 0)}
              </Text>
              <LineChart labels={labels} data={dataLineChart} />
            </Card>
            <Card>
              <Text as="h4" variant="headingLg" fontWeight="bold">
                Revenues
              </Text>
              <Text as="h3" variant="headingXl" fontWeight="bold">
                ${dataBarChart?.reduce((sum, num) => sum + num, 0)}
              </Text>
              <BarChart labels={labels} data={dataBarChart} />
            </Card>
          </div>
        </Layout.Section>
      </Layout>
    </Page>
  );
};
