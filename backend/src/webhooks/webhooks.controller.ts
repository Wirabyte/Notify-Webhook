import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { WebhooksService } from './webhooks.service';
import { CreateWebhookDto, UpdateWebhookDto, WebhookDto } from './dto/webhook.dto';

@ApiTags('webhooks')
@Controller('webhooks')
export class WebhooksController {
  constructor(private readonly webhooksService: WebhooksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new webhook' })
  @ApiResponse({
    status: 201,
    description: 'Webhook created successfully',
    type: WebhookDto,
  })
  create(@Body() createWebhookDto: CreateWebhookDto) {
    return this.webhooksService.create(createWebhookDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all webhooks' })
  @ApiResponse({
    status: 200,
    description: 'List of all webhooks',
    type: [WebhookDto],
  })
  findAll() {
    return this.webhooksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a webhook by ID' })
  @ApiParam({ name: 'id', description: 'Webhook ID' })
  @ApiResponse({ status: 200, description: 'Webhook found', type: WebhookDto })
  @ApiResponse({ status: 404, description: 'Webhook not found' })
  findOne(@Param('id') id: string) {
    return this.webhooksService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a webhook' })
  @ApiParam({ name: 'id', description: 'Webhook ID' })
  @ApiResponse({
    status: 200,
    description: 'Webhook updated successfully',
    type: WebhookDto,
  })
  @ApiResponse({ status: 404, description: 'Webhook not found' })
  update(@Param('id') id: string, @Body() updateWebhookDto: UpdateWebhookDto) {
    return this.webhooksService.update(id, updateWebhookDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a webhook' })
  @ApiParam({ name: 'id', description: 'Webhook ID' })
  @ApiResponse({ status: 204, description: 'Webhook deleted successfully' })
  @ApiResponse({ status: 404, description: 'Webhook not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.webhooksService.remove(id);
  }

  @Post(':id/trigger')
  @ApiOperation({ summary: 'Trigger a webhook manually' })
  @ApiParam({ name: 'id', description: 'Webhook ID' })
  @ApiResponse({ status: 200, description: 'Webhook triggered successfully' })
  @ApiResponse({ status: 404, description: 'Webhook not found' })
  trigger(@Param('id') id: string, @Body() payload: any) {
    return this.webhooksService.trigger(id, payload);
  }
}
